/**
 * The Flask chatbot backend (Websitebot/app.py) formats its replies with a small
 * HTML subset -- `<br>` for paragraph breaks and `<b>` for emphasis -- because its
 * own template renders answers with `innerHTML`. React escapes strings, so those
 * tags would otherwise show up as literal "<br>" text in the chat bubbles.
 *
 * Rather than reaching for `dangerouslySetInnerHTML` (the reply text embeds
 * user-supplied fragments, e.g. the "I think you meant <b>{guess}</b>" lead-in),
 * we parse the known tag subset ourselves and emit real React elements. Anything
 * we do not recognise stays plain text, so no markup from the model or the user
 * can ever reach the DOM as HTML.
 */

import React from "react";

// `<br>` / `<br/>` and the paired inline emphasis tags the backend actually emits.
const TOKEN = /<br\s*\/?>|<(\/?)(b|strong|i|em)\s*>/gi;

const NAMED_ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

const TAG_ELEMENT = { b: "strong", strong: "strong", i: "em", em: "em" };

function decodeEntities(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code) => {
    if (code[0] === "#") {
      const point =
        code[1] === "x" || code[1] === "X"
          ? parseInt(code.slice(2), 16)
          : parseInt(code.slice(1), 10);
      return Number.isFinite(point) ? String.fromCodePoint(point) : match;
    }
    const named = NAMED_ENTITIES[code.toLowerCase()];
    return named === undefined ? match : named;
  });
}

function appendText(node, raw) {
  if (!raw) return;
  node.children.push({ tag: "#text", text: decodeEntities(raw) });
}

/** Builds a shallow tree of {tag, children} from the reply string. */
function parse(text) {
  const root = { tag: null, children: [] };
  const stack = [root];
  let cursor = 0;
  let match;

  TOKEN.lastIndex = 0;
  while ((match = TOKEN.exec(text)) !== null) {
    const top = stack[stack.length - 1];
    appendText(top, text.slice(cursor, match.index));
    cursor = TOKEN.lastIndex;

    const [token, slash, rawTag] = match;

    if (!rawTag) {
      top.children.push({ tag: "br" });
      continue;
    }

    const tag = TAG_ELEMENT[rawTag.toLowerCase()];

    if (!slash) {
      const node = { tag, children: [] };
      top.children.push(node);
      stack.push(node);
      continue;
    }

    // Only close a tag we actually opened; a stray "</b>" is dropped rather than
    // being allowed to unwind past the root.
    const openIndex = stack.findIndex((n, i) => i > 0 && n.tag === tag);
    if (openIndex > 0) stack.length = openIndex;
    else appendText(top, token);
  }

  appendText(stack[stack.length - 1], text.slice(cursor));
  return root;
}

function toElements(children, keyPrefix = "n") {
  return children.map((node, i) => {
    const key = `${keyPrefix}-${i}`;
    if (node.tag === "#text") return <React.Fragment key={key}>{node.text}</React.Fragment>;
    if (node.tag === "br") return <br key={key} />;
    return React.createElement(node.tag, { key }, toElements(node.children, key));
  });
}

/**
 * Renders a bot reply as React nodes, turning `<br>` into real line breaks and
 * `<b>`/`<i>` into emphasis. Returns the raw string untouched for non-strings.
 */
export function renderBotMessage(text) {
  if (typeof text !== "string" || text === "") return text ?? null;
  if (!/[<&]/.test(text)) return text; // fast path: nothing to parse
  return toElements(parse(text).children);
}

// Pictographs, dingbats and flags, plus the variation-selector / ZWJ glue between
// them. The two combining code points are kept out of the character class, where
// they would silently pair up with a neighbouring character.
const EMOJI =
  /[\u{1F000}-\u{1FAFF}\u{1F1E6}-\u{1F1FF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}]|\u{FE0F}|\u{200D}/gu;

/**
 * Flattens a reply into something a speech synthesiser can read: tags become
 * sentence pauses, entities are decoded, and emoji are dropped so the voice does
 * not announce "waving hand sign" in the middle of a greeting.
 */
export function toSpeakableText(text) {
  if (typeof text !== "string") return "";
  return decodeEntities(text)
    .replace(/<br\s*\/?>/gi, ". ")
    .replace(/<\/?[a-z][^>]*>/gi, "")
    .replace(EMOJI, "")
    .replace(/\s+/g, " ")
    // `<br><br>` turned into two stops, and stripped emoji leave a gap before
    // them -- collapse both so the voice does not stutter through the pauses.
    .replace(/\s+([.,!?])/g, "$1")
    .replace(/(?:\.\s*){2,}/g, ". ")
    .trim();
}

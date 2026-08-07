import React from "react";

import CloudDevDetail from "../FullStackDevelopment/CloudDevDetail";
import CRMDevDetail from "../FullStackDevelopment/CRMDevDetail";
import FullStackHero from "../FullStackDevelopment/FullStackHero";
import MobileDevDetail from "../FullStackDevelopment/MobileDevDetail";
import TechnicalGrid from "../FullStackDevelopment/TechnicalGrid";
import WebDevDetail from "../FullStackDevelopment/WebDevDetail";

export default function FullStackDevelopment() {
    return (
        <>
            
            <FullStackHero />
            <TechnicalGrid />
            <WebDevDetail />
            <MobileDevDetail />
            <CRMDevDetail />
            <CloudDevDetail />
        </>
    );
}

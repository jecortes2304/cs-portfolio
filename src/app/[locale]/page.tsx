import React from "react";
import Hero from "@/components/hero/Hero";
import Summarize from "@/components/summarize/Summarize";
import About from "@/components/about/About";
import Portfolio from "@/components/portfolio/Portfolio";
import Contact from "@/components/contact/Contact";
import Header from "@/components/header/Header";

export default async function Home() {

    return (
        <aside>
            <Header/>
            <Hero/>
            <Summarize/>
            <About/>
            <Portfolio/>
            <Contact/>
        </aside>
    );
}
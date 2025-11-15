import React from "react";
import Hero from "@/components/hero/Hero";
import Summarize from "@/components/summarize/Summarize";
import About from "@/components/about/About";
import Portfolio from "@/components/portfolio/Portfolio";
import Contact from "@/components/contact/Contact";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default async function Home() {

    return (
        <div>
            <Header/>
            <Hero/>
            <Summarize/>
            <About/>
            <Portfolio/>
            <Contact/>
            <Footer />
        </div>
    );
}
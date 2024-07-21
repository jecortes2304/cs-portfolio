import FormContact from "@/components/contact/FormContact";
import {EnvelopeIcon, MapPinIcon, PhoneIcon} from "@heroicons/react/24/outline";
import {getTranslations} from "next-intl/server";
import React from "react";

const Contact: React.FC = async () => {
    const t = await getTranslations('HomePage.ContactSection');

    return (
        <div id="contact" className="bg-black text-white py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8">{t('title')}</h2>
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <address className="space-y-6">
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4">
                                    <PhoneIcon className="block p-2 rounded-full border border-white text-blue-400"/>
                                </div>
                                <p>{t('phone')}</p>
                            </div>
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4">
                                    <EnvelopeIcon className="block p-2.5 rounded-full border border-white text-blue-400"/>
                                </div>
                                <p>{t('email')}</p>
                            </div>
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4">
                                    <MapPinIcon className="block p-2 rounded-full border border-white text-blue-400"/>
                                </div>
                                <p>{t('address')}</p>
                            </div>
                        </address>
                    </div>
                    <div className="md:w-1/2">
                        <FormContact />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
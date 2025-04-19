"use client"
import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react';
import {sendEmail} from "@/lib/request/email/sendEmail";
import {FormDataEmail, FormDataEmailErrors} from "@/schemas/EmailSchemas";
import sendingJsonAnim from "@/components/animations/sending.json";
import { useTranslations } from 'next-intl';
import dynamic from "next/dynamic";

const AnimatorRender = dynamic(() => import('@/components/animations/AnimnationRender'), {
    ssr: false,
});

export default function FormContact() {
    const t = useTranslations('HomePage.ContactSection.form');

    const form = useRef(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const initialAlertValues = useMemo(() => ({
        isVisible: false,
        alertClass: 'bg-[#368FD4]',
        message: t('successMessage')
    }), [t]);

    const [formValues, setFormValues] = useState<FormDataEmail>({
        name: "", email: "", subject: "" , message: ""
    });

    const [formErrors, setFormErrors] = useState<FormDataEmailErrors>(
        {name: "", email: "", message: ""}
    );

    const [isSubmit, setIsSubmit] = useState(false);
    const [alertValues, setAlertValues] = useState(initialAlertValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    };

    const sendEmailToService = useCallback(async () => {
        setIsLoading(true);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            const response = await sendEmail(formValues);

            if (response) {
                setAlertValues({
                    ...alertValues, isVisible: true,
                    alertClass: "bg-[#368FD4]",
                    message: t('successMessage')
                });
                setFormValues(formValues);
                setIsSubmit(false);
                setTimeout(
                    function () {
                        setAlertValues(initialAlertValues)
                    }, 2000);
                cleanFormsValues();
            } else {
                setFormErrors({
                    ...formErrors, name: t('errorMessage')
                });
                setAlertValues({
                    ...alertValues, isVisible: true,
                    alertClass: "bg-red-500",
                    message: t('errorMessage')
                });
                setIsSubmit(false);
                setTimeout(
                    function () {
                        setAlertValues(initialAlertValues)
                    }, 2000);
            }
        }
        setIsLoading(false);

    }, [alertValues, formErrors, formValues, initialAlertValues, isSubmit, t]);

    useEffect(() => {
        sendEmailToService().then();
    }, [sendEmailToService, formErrors, isSubmit]);

    const validate = (values: FormDataEmail) => {
        const errors: FormDataEmailErrors = {};
        const regex = /^[a-zA-Z\d._-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,4}$/;
        if (!values.name) {
            errors.name = t('errorName')
        }
        if (!values.email) {
            errors.email = t('errorEmail')
        } else if (!regex.test(values.email)) {
            errors.email = t('errorEmailFormat')
        }
        if (!values.subject) {
            errors.subject = t('errorSubject')
        }
        if (!values.message) {
            errors.message = t('errorMessageRequired')
        }
        return errors;
    };

    const cleanFormsValues = () => {
        setFormValues({name: "", email: "", subject: "", message: ""});
        setFormErrors({name: "", email: "", message: ""});
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validate(formValues);
        setFormErrors(errors);
        setIsSubmit(true);
    };

    return (
        <div className="w-full">
            {alertValues.isVisible && (
                <div className={`${alertValues.alertClass} text-white p-4 mb-4 rounded`}>
                    {alertValues.message}
                </div>
            )}
            <form ref={form} onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="name"
                    type="text"
                    placeholder={t('name')}
                    value={formValues.name}
                    onChange={handleChange}
                    className="w-full p-3 bg-transparent border border-gray-700 rounded text-white focus:border-[#368FD4] focus:outline-none"
                />
                {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}

                <input
                    name="email"
                    type="email"
                    placeholder={t('email')}
                    value={formValues.email}
                    onChange={handleChange}
                    className="w-full p-3 bg-transparent border border-gray-700 rounded text-white focus:border-[#368FD4] focus:outline-none"
                />
                {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}

                <input
                    name="subject"
                    type="text"
                    placeholder={t('subject')}
                    value={formValues.subject}
                    onChange={handleChange}
                    className="w-full p-3 bg-transparent border border-gray-700 rounded text-white focus:border-[#368FD4] focus:outline-none"
                />
                {formErrors.subject && <p className="text-red-500 text-sm">{formErrors.subject}</p>}

                <textarea
                    name="message"
                    rows={5}
                    placeholder={t('message')}
                    value={formValues.message}
                    onChange={handleChange}
                    className="w-full p-3 bg-transparent border border-gray-700 rounded text-white focus:border-[#368FD4] focus:outline-none"
                />
                {formErrors.message && <p className="text-red-500 text-sm">{formErrors.message}</p>}

                {isLoading ? (
                    <div className="w-full h-[80px] flex items-center justify-center">
                        <AnimatorRender animJson={sendingJsonAnim} height={50} width={50} vis={isLoading ? "visible" : "hidden"}/>
                    </div>
                ): (
                    <button
                        type="submit"
                        className="w-full bg-[#368FD4] text-white p-3 rounded hover:bg-[#2a7ab8] transition duration-300"
                    >
                        {t('send')}
                    </button>
                )}
            </form>
        </div>
    )
}
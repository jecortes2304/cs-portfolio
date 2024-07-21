import {UIElementData} from "photoswipe";

const Rotate: UIElementData [] = [
    {
        name: 'custom-rotate-button',
        ariaLabel: 'Rotate',
        order: 9,
        isButton: true,
        html: {
            isCustomSVG: true,
            inner:
                '<path d="M13.887 6.078C14.258 6.234 14.5 6.598 14.5 7V8.517C18.332 8.657 21.258 10.055 23.15 12.367 24.519 14.041 25.289 16.13 25.496 18.409A1 1 0 0123.504 18.591C23.327 16.645 22.68 14.952 21.601 13.633 20.156 11.867 17.831 10.653 14.5 10.517V12A1.002 1.002 0 0112.779 12.693L10.304 10.121A1.002 1.002 0 0110.324 8.713L12.8 6.286A1 1 0 0113.887 6.078ZM7.5 16A1.5 1.5 0 006 17.5V24.5A1.5 1.5 0 007.5 26H17.5A1.5 1.5 0 0019 24.5V17.5A1.5 1.5 0 0017.5 16H7.5Z" id="pswp__icn-rotate"/>',
            outlineID: 'pswp__icn-rotate',
        },
        appendTo: 'bar',
        onClick: (e: any, el: any, pswpInstance: any) => {
            const item = pswpInstance.currSlide.content.element

            const prevRotateAngle = Number(item.dataset.rotateAngel) || 0
            const rotateAngle = prevRotateAngle === 270 ? 0 : prevRotateAngle + 90

            // add slide rotation
            item.style.transform = `${item.style.transform.replace(
                `rotate(-${prevRotateAngle}deg)`,
                '',
            )} rotate(-${rotateAngle}deg)`
            item.dataset.rotateAngel = rotateAngle
        },
    },
];

export default Rotate;
// Copyright 2025 SpiralDev
// Licensed under the Apache License, Version 2.0
// See LICENSE file for details.

main_color = '#3a3b44'
light_color = '#ffffff';
mid_color = '#ffffff';
dark_color = '#ffffff';

const savedColor = getThemeCookie();
if (savedColor) {
    main_color = savedColor;
}

function setThemeCookie(color) {
    document.cookie = `twitch_theme_color=${color}; path=/; domain=.twitch.tv; max-age=${60*60*24*365}`;
}

function getThemeCookie() {
    const match = document.cookie.match(/(^|;) ?twitch_theme_color=([^;]*)/);
    return match ? match[2] : null;
}


RefreshTheme();


function Modify_Property(id,color) {
    document.documentElement.style.setProperty(id,color);
    console.log("Replaced " + id + " with " + color)
}
function Add_Custom_Style(style) {
    const elements = document.querySelectorAll('#twitch_themer_style');
    elements.forEach(el => el.remove());
    
    const styleEl = document.createElement("style");
    styleEl.id = "twitch_themer_style";
    styleEl.innerHTML = style;
    document.head.appendChild(styleEl);

    console.log("Applied style " + style);
}

function subtractHexColor(hex, r, g, b, a = 0) {
    hex = hex.replace('#', '');

    let red = parseInt(hex.substring(0, 2), 16);
    let green = parseInt(hex.substring(2, 4), 16);
    let blue = parseInt(hex.substring(4, 6), 16);
    let alpha = hex.length === 8 ? parseInt(hex.substring(6, 8), 16) : 255;

    red = Math.max(0, red - r);
    green = Math.max(0, green - g);
    blue = Math.max(0, blue - b);
    alpha = Math.max(0, alpha - a);

    const toHex = n => n.toString(16).padStart(2, '0');

    return '#' + toHex(red) + toHex(green) + toHex(blue) + (hex.length === 8 ? toHex(alpha) : '');
}

function RefreshTheme() {
    light_color = subtractHexColor(main_color,8,8,8,0)
    mid_color = subtractHexColor(main_color,25,25,25,0)
    dark_color = subtractHexColor(main_color,35,35,35,0)

    Modify_Property('--color-background-float', main_color);
    Modify_Property('--color-background-alt', light_color);
    Modify_Property('--color-background-base', mid_color);
    Modify_Property('--color-background-button-secondary-default', mid_color);
    Modify_Property('--color-background-tag-default', mid_color);
    Modify_Property('--color-background-body', dark_color);

    Add_Custom_Style(`
        .tw-root--theme-dark .sunlight-expanded-nav-drop-down-menu-layout__scrollable-area,
        .tw-root--theme-dark .stream-manager--page-view .mosaic-window-body,
        .tw-root--theme-dark .ach-sb,
        .tw-root--theme-dark .carousel-metadata,
        .tw-root--theme-light .sunlight-expanded-nav-drop-down-menu-layout__scrollable-area,
        .tw-root--theme-light .stream-manager--page-view .mosaic-window-body,
        .tw-root--theme-light .ach-sb,
        .tw-root--theme-light .carousel-metadata,
        .bXENUW,
        .gGttfb,
        .hpmfua
        {
            background: ` + mid_color + ` !important;
        }
        `
    )
}

RefreshTheme();

const container = document.querySelector('.cRMumF');

if (container && container.firstChild) {
    const themer_button = document.createElement('themer_button');
    themer_button.textContent = "Themer";
    themer_button.style.padding = "6px 12px";
    themer_button.style.margin = "6px";
    themer_button.style.borderRadius = "6px";
    themer_button.style.border = "1px solid #444";
    themer_button.style.background = mid_color;
    themer_button.style.cursor = "pointer";

    const themer_gui = document.createElement('div');
    themer_gui.style.display = "none";
    themer_gui.style.position = "absolute";
    themer_gui.style.top = "50px";
    themer_gui.style.left = "50px";
    themer_gui.style.padding = "10px";
    themer_gui.style.background = mid_color;
    themer_gui.style.border = "1px solid #666";
    themer_gui.style.borderRadius = "8px";
    themer_gui.style.boxShadow = "0 4px 12px rgba(0,0,0,0.4)";
    themer_gui.style.color = "#fff";
    themer_gui.style.zIndex = "9999";
    document.body.appendChild(themer_gui);

    const hex_picker = document.createElement('div');
    hex_picker.innerHTML = `
    <input type="color" id="hex_picker_themer" name="hex_picker_themer" value="${main_color}"/>
    <label for="hex_picker_themer">Theme Color</label>`;
    themer_gui.appendChild(hex_picker);

    const colorInput = hex_picker.querySelector('#hex_picker_themer');
    colorInput.addEventListener('input', (event) => {
        const selectedColor = event.target.value;
        console.log("Selected color:", selectedColor);

        setThemeCookie(selectedColor)

        main_color = selectedColor
        themer_gui.style.background = selectedColor
        themer_button.style .background = selectedColor
        RefreshTheme()
    });

    themer_button.addEventListener('click', () => {
        const rect = themer_button.getBoundingClientRect();
        themer_gui.style.position = "fixed";
        themer_gui.style.top = rect.bottom + 5 + "px";
        themer_gui.style.left = rect.left + "px";
        themer_gui.style.display = themer_gui.style.display === "none" ? "block" : "none";
    });

    container.children[0].after(themer_button);
    document.body.appendChild(themer_gui);
}
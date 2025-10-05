// Copyright 2025 SpiralDev
// Licensed under the Apache License, Version 2.0
// See LICENSE file for details.


theme_main_color = '#3a3b44'
theme_light_color = '#ffffffff';
theme_mid_color = '#ffffffff';
theme_dark_color = '#ffffffff';
text_color = '#ffffffff'

const savedThemeColor = getCookie("twitch_theme_color");
if (savedThemeColor) {
    theme_main_color = savedThemeColor;
}

const savedTextColor = getCookie("twitch_text_color");
if (savedTextColor) {
    text_color = savedTextColor;
}

function setCookie(key,value) {
    document.cookie = `${key}=${value}; path=/; domain=.twitch.tv; max-age=${60*60*24*365}`;
}

function getCookie(key) {
    const match = document.cookie.match(
        new RegExp(`(^|;)\\s*${key}=([^;]*)`)
    );
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
    
    // Create new style element
    const styleEl = document.createElement("style");
    styleEl.id = "twitch_themer_style";
    styleEl.textContent = style;
    document.head.appendChild(styleEl);

    console.log("Applied style " + style);
}


function ModifyHexColor(hex, r, g, b, a = 0) {
    hex = hex.replace('#', '');

    let red = parseInt(hex.substring(0, 2), 16);
    let green = parseInt(hex.substring(2, 4), 16);
    let blue = parseInt(hex.substring(4, 6), 16);
    let alpha = hex.length === 8 ? parseInt(hex.substring(6, 8), 16) : 255;

    red = Math.max(0, red + r);
    green = Math.max(0, green + g);
    blue = Math.max(0, blue + b);
    alpha = Math.max(0, alpha + a);

    const toHex = n => n.toString(16).padStart(2, '0');

    return '#' + toHex(red) + toHex(green) + toHex(blue) + (hex.length === 8 ? toHex(alpha) : '');
}

function RefreshTheme() {
    theme_light_color = ModifyHexColor(theme_main_color,-8,-8,-8,0)
    theme_mid_color = ModifyHexColor(theme_main_color,-25,-25,-25,0)
    theme_dark_color = ModifyHexColor(theme_main_color,-35,-35,-35,0)

    Modify_Property('--color-background-float', theme_main_color);
    Modify_Property('--color-background-pill', theme_main_color);
    Modify_Property('--color-background-alt', theme_light_color);
    Modify_Property('--color-background-base', theme_mid_color);
    Modify_Property('--color-hinted-grey-2', theme_mid_color);
    Modify_Property('--color-background-button-secondary-default', theme_light_color);
    Modify_Property('--color-background-tag-default', theme_mid_color);
    Modify_Property('--color-background-body', theme_dark_color);
    
    Modify_Property('--color-text-base', text_color);
    Modify_Property('--color-text-alt-2', ModifyHexColor(text_color,-15,-15,-15,0));
    Modify_Property('--color-text-button', text_color);
    Modify_Property('--color-text-button-info', text_color);
    Modify_Property('--color-text-button-success', text_color);
    Modify_Property('--color-text-button-warn', text_color);
    Modify_Property('--color-text-button-error', text_color);
    Modify_Property('--color-text-button-destructive', text_color);
    Modify_Property('--color-text-button-text-hover', text_color);
    Modify_Property('--color-text-button-secondary', text_color);
    Modify_Property('--color-text-input', text_color);
    Modify_Property('--color-accent-label', text_color);

    Modify_Property('--color-fill-button-icon', "#ffff");
    Modify_Property('--color-fill-current', "#ffff");
    

    Add_Custom_Style(`
        .hex-picker-container
        {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 5px;
            color : ` + text_color + `
        }

        .tw-root--theme-dark .sunlight-expanded-nav-drop-down-menu-layout__scrollable-area,
        .tw-root--theme-dark .stream-manager--page-view .mosaic-window-body,
        .tw-root--theme-dark .ach-sb,
        .tw-root--theme-dark .carousel-metadata,
        .tw-root--theme-light .sunlight-expanded-nav-drop-down-menu-layout__scrollable-area,
        .tw-root--theme-light .stream-manager--page-view .mosaic-window-body,
        .tw-root--theme-light .ach-sb,
        .tw-root--theme-light .carousel-metadata,
        .gGttfb,
        .hpmfua,
        .highlight__collapsed,
        .highlight,
        .hQkcFk
        {
            background: ` + theme_mid_color + ` !important;
        }

        .fzEneC,
        .gxRpGQ,
        .tw-root--theme-dark .info_box_row,
        .tw-root--theme-light .info_box_row,
        .bXENUW
        {
            background: ` + theme_light_color + ` !important;
        }

        .tw-root--theme-dark .chat-wysiwyg-input__placeholder,
        .tw-root--theme-light .chat-wysiwyg-input__placeholder,
        .tw-root--theme-dark .navigation-link,
        .tw-root--theme-light .navigation-link,
        .ljigeK,
        .gPNLhS
        {
            color : ` + text_color + ` !important;
        }

        .bXENUW
        {
            color : ` + ModifyHexColor(text_color,10,10,10,0) + ` !important;
        }

        .seventv-settings-menu-button,
        .seventv-tw-button button[data-v-a098149a]:hover,
        .ffz-i-pd-1::before,
        .tw-root--hover .tw-button-icon:not(:disabled):hover,
        .tw-root--hover .tw-button-icon:not(.tw-button-icon--disabled):hover,
        .cCspFn,
        .jgpfbi
        {
            color : #ffff !important;
        }

        .cWFBTs
        {
            color: ` + ModifyHexColor(text_color,-15,-15,-15,0) + ` !important;
        }


        `
    )
}

RefreshTheme();

let container = document.querySelector('.cRMumF') || null;

var is_homepage = true
if (!container) {
    container = document.querySelector('.sunlight-expanded-nav-drop-down-menu-layout__content')
    is_homepage = false
}

if (container && container.firstChild) {
    let colorInput;
    let label;


    // Button/GUI

    const themer_button = document.createElement('themer_button');
    themer_button.textContent = "Themer";
    themer_button.style.padding = "6px 12px";
    themer_button.style.margin = "6px";
    themer_button.style.borderRadius = "6px";
    themer_button.style.border = "1px solid #444";
    themer_button.style.background = theme_mid_color;
    themer_button.style.cursor = "pointer";

    const themer_gui = document.createElement('div');
    themer_gui.style.display = "none";
    themer_gui.style.position = "absolute";
    themer_gui.style.top = "50px";
    themer_gui.style.left = "50px";
    themer_gui.style.padding = "10px";
    themer_gui.style.background = theme_mid_color;
    themer_gui.style.border = "1px solid #666";
    themer_gui.style.borderRadius = "8px";
    themer_gui.style.boxShadow = "0 4px 12px rgba(0,0,0,0.4)";
    themer_gui.style.color = "#fff";
    themer_gui.style.zIndex = "9999";
    document.body.appendChild(themer_gui);

    themer_button.addEventListener('click', () => {
        const rect = themer_button.getBoundingClientRect();
        themer_gui.style.position = "fixed";
        themer_gui.style.top = rect.bottom + 5 + "px";
        themer_gui.style.left = rect.left + "px";
        themer_gui.style.display = themer_gui.style.display === "none" ? "block" : "none";
    });

    document.addEventListener('click', (event) => {
        const isClickInsideGUI = themer_gui.contains(event.target);
        const isClickOnButton = themer_button.contains(event.target);

        if (!isClickInsideGUI && !isClickOnButton) {
            themer_gui.style.display = "none";
        }
    });


    // BG Hex Picker

    const theme_hex_picker = document.createElement('div');
    colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.id = 'theme_hex_picker';
    colorInput.name = 'theme_hex_picker';
    colorInput.value = theme_main_color;

    label = document.createElement('label');
    label.htmlFor = 'theme_hex_picker';
    label.textContent = 'Theme Color';

    theme_hex_picker.appendChild(colorInput);
    theme_hex_picker.appendChild(label);
    theme_hex_picker.classList.add('hex-picker-container');

    themer_gui.appendChild(theme_hex_picker);

    const themeColorInput = theme_hex_picker.querySelector('#theme_hex_picker');
    themeColorInput.addEventListener('input', (event) => {
        const selectedColor = event.target.value;
        console.log("Selected color:", selectedColor);

        setCookie("twitch_theme_color",selectedColor)

        theme_main_color = selectedColor
        themer_gui.style.background = selectedColor
        themer_button.style .background = selectedColor
        RefreshTheme()
    });


    // Text Hex Picker

    const text_hex_picker = document.createElement('div');
    colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.id = 'text_hex_picker';
    colorInput.name = 'text_hex_picker';
    colorInput.value = text_color;

    label = document.createElement('label');
    label.htmlFor = 'text_hex_picker';
    label.textContent = 'Text Color';

    text_hex_picker.appendChild(colorInput);
    text_hex_picker.appendChild(label);
    text_hex_picker.classList.add('hex-picker-container');

    themer_gui.appendChild(text_hex_picker);

    const textColorInput = text_hex_picker.querySelector('#text_hex_picker');
    textColorInput.addEventListener('input', (event) => {
        const selectedColor = event.target.value;
        console.log("Selected color:", selectedColor);

        setCookie("twitch_text_color",selectedColor)

        text_color = selectedColor
        RefreshTheme()
    });


    // Setting location for button

    if (is_homepage) {
        container.children[0].after(themer_button);
    } else {
        container.after(themer_button);
    }

    document.body.appendChild(themer_gui);
}
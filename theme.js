// Copyright 2025 SpiralDev
// Licensed under the Apache License, Version 2.0
// See LICENSE file for details.

theme_main_color = "#3b3b44";
text_color = "#efeff1"
twitch_color = "#9147ff"

const savedThemeColor = getCookie("twitch_theme_color");
if (savedThemeColor) {
    theme_main_color = savedThemeColor;
}

const savedTextColor = getCookie("twitch_text_color");
if (savedTextColor) {
    text_color = savedTextColor;
}

const savedTwitchColor = getCookie("twitch_twitch_color");
if (savedTwitchColor) {
    twitch_color = savedTwitchColor;
    console.log(savedTwitchColor)
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

function Modify_Property(id,value) {
    document.documentElement.style.setProperty(id,value);
}

function Add_Custom_Style(style,id) {
    const elements = document.querySelectorAll(`#twitch_themer--${id}`);
    elements.forEach(el => el.remove());
    
    // Create new style element with the ID
    const styleEl = document.createElement("style");
    styleEl.id = `twitch_themer--${id}`;
    styleEl.textContent = style;
    document.head.appendChild(styleEl);

    console.log(`Applied style ${id}\n${style}`);
}


function ModifyHexColor(hex, r, g, b, a = 0) {
    if (hex == null) {
        console.error(`Failed to convert hex: ${hex} by r:${r}, g:${g}, b:${b}, a:${a}`)
        return hex;
    }
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
    Modify_Property('--color-twitch-purple-1', ModifyHexColor(twitch_color,-141,-70,-246));
    Modify_Property('--color-twitch-purple-2', ModifyHexColor(twitch_color,-132,-68,-227));
    Modify_Property('--color-twitch-purple-3', ModifyHexColor(twitch_color,-124,-66,-209));
    Modify_Property('--color-twitch-purple-4', ModifyHexColor(twitch_color,-110,-62,-177));
    Modify_Property('--color-twitch-purple-5', ModifyHexColor(twitch_color,-94,-59,-145));
    Modify_Property('--color-twitch-purple-6', ModifyHexColor(twitch_color,-76,-55,-108));
    Modify_Property('--color-twitch-purple-7', ModifyHexColor(twitch_color,-53,-49,-58));
    Modify_Property('--color-twitch-purple-8', ModifyHexColor(twitch_color,-26,-27,0));
    Modify_Property('--color-twitch-purple-9', twitch_color);
    Modify_Property('--color-twitch-purple-10', ModifyHexColor(twitch_color,24,41,0));
    Modify_Property('--color-twitch-purple-11', ModifyHexColor(twitch_color,46,77,0));
    Modify_Property('--color-twitch-purple-12', ModifyHexColor(twitch_color,64,108,0));
    Modify_Property('--color-twitch-purple-13', ModifyHexColor(twitch_color,82,138,0));
    Modify_Property('--color-twitch-purple-14', ModifyHexColor(twitch_color,92,153,0));
    Modify_Property('--color-twitch-purple-15', ModifyHexColor(twitch_color,98,164,0));

    Modify_Property("--gradient-ambient-cuddle-twitch-purple", "linear-gradient(#fa1ed2 0%, var(--color-twitch-purple-9) 100%)")


    Modify_Property('--color-background-float', theme_main_color); // 4/4 Bright (max)
    Modify_Property('--color-background-alt', ModifyHexColor(theme_main_color,-8,-8,-8,0)); // 3/4 Bright (high)
    Modify_Property('--color-background-base', ModifyHexColor(theme_main_color,-25,-25,-25,0)); // 2/4 Bright (mid)
    Modify_Property('--color-background-body', ModifyHexColor(theme_main_color,-35,-35,-35,0)); // 1/4 Bright (dark)

    Modify_Property('--color-background-pill', "var(--color-background-float)");
    Modify_Property('--color-background-button-secondary-default', "var(--color-background-alt)");
    Modify_Property('--color-hinted-grey-2', "var(--color-background-base)");
    Modify_Property('--color-background-tag-default', "var(--color-background-base)");
    

    Modify_Property('--color-text-base', text_color);
    Modify_Property('--color-text-alt-2', ModifyHexColor(text_color,-15,-15,-15,0));
    Modify_Property('--color-opac-gd-2', ModifyHexColor(text_color,-30,-30,-30,0));

    Modify_Property('--color-text-button', "var(--color-text-base)");
    Modify_Property('--color-text-button-info', "var(--color-text-base)");
    Modify_Property('--color-text-button-success', "var(--color-text-base)");
    Modify_Property('--color-text-button-warn', "var(--color-text-base)");
    Modify_Property('--color-text-button-error', "var(--color-text-base)");
    Modify_Property('--color-text-button-destructive', "var(--color-text-base)");
    Modify_Property('--color-text-button-text-hover', "var(--color-text-base)");
    Modify_Property('--color-text-button-secondary', "var(--color-text-base)");
    Modify_Property('--color-text-input', "var(--color-text-base)");
    Modify_Property('--color-accent-label', "var(--color-text-base)");

    Modify_Property('--color-fill-button-icon', "#ffff");
    Modify_Property('--color-fill-current', "#ffff");
    Modify_Property("--color-border-input", "#ffff");
    

    Add_Custom_Style(`
        .hex-picker-container
        {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 5px;
            color : ` + text_color + `
        }

        #theme_hex_picker,
        #text_hex_picker,
        #twitch_hex_picker
        {
            -webkit-appearance: none;
            padding: 0;
            cursor: pointer;
        }

        #theme_hex_picker::-webkit-color-swatch-wrapper,
        #text_hex_picker::-webkit-color-swatch-wrapper,
        #twitch_hex_picker::-webkit-color-swatch-wrapper
        {
            padding: 0;
        }

        #theme_hex_picker::-webkit-color-swatch,
        #text_hex_picker::-webkit-color-swatch,
        #twitch_hex_picker::-webkit-color-swatch
        {
            border: none;
        }
        
        #theme_hex_picker::-moz-color-swatch,
        #text_hex_picker::-moz-color-swatch,
        #twitch_hex_picker::-moz-color-swatch
        {
            border: none;
        }
        `,id="gui"
    )

    Add_Custom_Style(`

        body
        {
            color-scheme: dark !important;
            scrollbar-color: hsla(0, 0%, 100%, .4) transparent !important;
        }

        .bybbL[type="search"], 
        .bybbL[type="date"], 
        .bybbL[type="datetime-local"], 
        .bybbL[type="time"], 
        .bybbL[type="week"], 
        .bybbL[type="month"]
        {
            color-scheme: dark !important;
        }
        
        .gGttfb
        {
            background-color: ${ModifyHexColor(theme_main_color,-8,-8,-8,0)} !important;
        }

        .tw-root--theme-dark .sunlight-expanded-nav-drop-down-menu-layout__scrollable-area,
        .tw-root--theme-dark .stream-manager--page-view .mosaic-window-body,
        .tw-root--theme-dark .ach-sb,
        .tw-root--theme-dark .carousel-metadata,
        .tw-root--theme-light .sunlight-expanded-nav-drop-down-menu-layout__scrollable-area,
        .tw-root--theme-light .stream-manager--page-view .mosaic-window-body,
        .tw-root--theme-light .ach-sb,
        .tw-root--theme-light .carousel-metadata,
        .hpmfua,
        .highlight__collapsed,
        .highlight,
        .hQkcFk,
        .bwACrq
        {
            background: var(--color-background-base) !important;
        }

        .fzEneC,
        .gxRpGQ,
        .tw-root--theme-dark .info_box_row,
        .tw-root--theme-light .info_box_row,
        .bXENUW
        {
            background: var(--color-background-alt) !important;
        }

        .tw-root--theme-dark .chat-wysiwyg-input__placeholder,
        .tw-root--theme-light .chat-wysiwyg-input__placeholder,
        .tw-root--theme-dark .navigation-link,
        .tw-root--theme-light .navigation-link,
        .ljigeK,
        .gPNLhS,
        .lbYztg,
        .bYjuhc,
        .fKHFsE,
        .isnsjj
        {
            color : var(--color-text-base) !important;
        }
        
        .tw-root--hover .tw-button-icon:not(:disabled):hover,
        .tw-root--hover .tw-button-icon:not(.tw-button-icon--disabled):hover,
        .cCspFn,
        .jgpfbi,
        .jiTMMY,
        #channel-points-reward-center-body > div > div > div.Layout-sc-1xcs6mc-0.cVSGvQ > div > button > div > div > div > p,
        .ljigeK,
        .gGttfb
        {
            color: var(--color-fill-button-icon) !important;
        }

        .bXENUW
        {
            color : ${ModifyHexColor(text_color,10,10,10,0)} !important;
        }

        .cWFBTs
        {
            color: var(--color-text-alt-2);
        }

        .quick-action-layout--purple 
        { 
            background: var(--color-twitch-purple-9) !important; 
        }

        .kccyMt
        {
            fill: #ffff !important;
        }

        .tw-root--theme-dark .creator-home-focus-position
        {
            background: linear-gradient(to bottom, var(--ch-bg-focus-color), var(--color-background-alt)); !important;
        }

        `,id="twitch"
    )

    Add_Custom_Style(`

        .seventv-settings-menu-button,
        .seventv-tw-button button[data-v-a098149a]:hover,
        .ffz-i-pd-1::before,
        .seventv-tw-button[data-v-32c0d32c]
        {
            color : #ffff !important;
        }
        `,id="seventv"
    )

    Add_Custom_Style(`
        .ffz-i-pd-1::before
        {
            color : #ffff !important;
        }
        `,id="ffz"
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
    themer_button.style.background = "var(--color-background-base)";
    themer_button.style.cursor = "pointer";
    themer_button.style.borderColor = "var(--color-opac-gd-2)";

    const themer_gui = document.createElement('div');
    themer_gui.style.display = "none";
    themer_gui.style.position = "absolute";
    themer_gui.style.top = "50px";
    themer_gui.style.left = "50px";
    themer_gui.style.padding = "10px";
    themer_gui.style.background = "var(--color-background-base)";
    themer_gui.style.border = "1px solid #666";
    themer_gui.style.borderRadius = "8px";
    themer_gui.style.boxShadow = "0 4px 12px rgba(0,0,0,0.4)";
    themer_gui.style.color = "#fff";
    themer_gui.style.zIndex = "9999";
    themer_gui.style.borderColor = "var(--color-opac-gd-2)";
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
    colorInput.style.background = theme_main_color;
    colorInput.style.borderWidth = "2px";

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

        setCookie("twitch_theme_color",selectedColor);

        theme_main_color = selectedColor;
        themer_gui.style.background = selectedColor;
        themer_button.style .background = selectedColor;
        RefreshTheme();
    });


    // Text Hex Picker

    const text_hex_picker = document.createElement('div');
    colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.id = 'text_hex_picker';
    colorInput.name = 'text_hex_picker';
    colorInput.value = text_color;
    colorInput.style.background = text_color;
    colorInput.style.borderWidth = "2px";

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

        setCookie("twitch_text_color",selectedColor);

        text_color = selectedColor;
        RefreshTheme();
    });


    // Text Hex Picker

    const twitch_hex_picker = document.createElement('div');
    colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.id = 'twitch_hex_picker';
    colorInput.name = 'twitch_hex_picker';
    colorInput.value = twitch_color;
    colorInput.style.background = twitch_color;
    colorInput.style.borderWidth = "2px";

    label = document.createElement('label');
    label.htmlFor = 'twitch_hex_picker';
    label.textContent = 'Twitch Color';

    twitch_hex_picker.appendChild(colorInput);
    twitch_hex_picker.appendChild(label);
    twitch_hex_picker.classList.add('hex-picker-container');

    themer_gui.appendChild(twitch_hex_picker);

    const twitchColorInput = twitch_hex_picker.querySelector('#twitch_hex_picker');
    twitchColorInput.addEventListener('input', (event) => {
        const selectedColor = event.target.value;
        console.log("Selected color:", selectedColor);

        setCookie("twitch_twitch_color",selectedColor);

        twitch_color = selectedColor;
        RefreshTheme();
    });


    // Setting location for button

    if (is_homepage) {
        container.children[0].after(themer_button);
    } else {
        container.after(themer_button);
    }

    document.body.appendChild(themer_gui);
}
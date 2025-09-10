const tintColorLight = '#67C090'; // main accent
const tintColorDark = '#DDF4E7';  // mint accent for dark mode

export const Colors = {
  light: {
    // Base colors
    color1: '#DDF4E7', // light mint
    color2: '#67C090', // primary green
    color3: '#26667F', // deep cyan-blue
    color4: '#124170', // dark blue

    // Shades
    color1_100: '#EDF9F0',
    color1_200: '#DDF4E7',
    color1_300: '#C6EAD6',
    color1_400: '#BEE7C9',
    color1_500: '#A0D9B0',

    color2_100: '#8FD9A7',
    color2_200: '#67C090',
    color2_300: '#4DAA75',
    color2_400: '#4A986F',
    color2_500: '#357854',

    color3_100: '#558C9F',
    color3_200: '#26667F',
    color3_300: '#1E5064',
    color3_400: '#1B3F51',
    color3_500: '#12303F',

    color4_100: '#3A5B7F',
    color4_200: '#124170',
    color4_300: '#0F3561',
    color4_400: '#0A2B3E',
    color4_500: '#041926',

    // Semantic
    background: '#DDF4E7',    // softer light bg
    text: '#124170',          // readable text
    bgAccent: '#67C090',      // primary accent
    textAccent: '#357854',    // darker green for contrast
    tint: tintColorLight,
    icon: '#26667F',
    tabIconDefault: '#26667F',
    tabIconSelected: tintColorLight,
    btn: '#124170',           // button more visible
  },
  dark: {
    // Base colors
    color1: '#041926',  // deep bg
    color2: '#26667F',  // primary cyan
    color3: '#67C090',  // green
    color4: '#DDF4E7',  // light mint

    // Shades
    color1_100: '#0A2B3E',
    color1_200: '#041926',
    color1_300: '#081D2D',
    color1_400: '#061520',
    color1_500: '#030C13',

    color2_100: '#1E5064',
    color2_200: '#26667F',
    color2_300: '#1C4B62',
    color2_400: '#163746',
    color2_500: '#0D212E',

    color3_100: '#4FA86B',
    color3_200: '#67C090',
    color3_300: '#3F8F57',
    color3_400: '#2C5D3D',
    color3_500: '#1B3928',

    color4_100: '#90CBB4',
    color4_200: '#DDF4E7',
    color4_300: '#B8E8D4',
    color4_400: '#6FA891',
    color4_500: '#4F806B',

    // Semantic
    background: '#041926',   // deep dark bg
    text: '#DDF4E7',         // readable light text
    bgAccent: '#67C090',     // highlight green
    textAccent: '#90CBB4',   // soft mint for labels
    tint: tintColorDark,
    icon: '#67C090',
    tabIconDefault: '#26667F',
    tabIconSelected: tintColorDark,
    btn: '#4FA86B',          // visible but soft
    bgeffect: 'rgba(255, 255, 255, 0.06)',
  },
};


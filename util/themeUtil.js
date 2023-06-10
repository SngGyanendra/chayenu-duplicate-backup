function lightenDarkenColor(col, amt) {
  var usePound = false;

  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col, 16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}


export const randomColors = () => {
  const colors = [
    {
      regular: "#5d88a8",
      dark: "#043750",
    },
    {
      regular: "#a2725a",
      dark: "#4f2918",
    },
    {
      regular: "#ea9d5f",
      dark: "#5f3e23",
    },
    {
      regular: "#9579cf",
      dark: "#3a285e",
    },
    {
      regular: "#de387c",
      dark: "#5b1631",
    },
    {
      regular: "#6dc0ac",
      dark: "#314c45",
    },
    {
      regular: "#cdab3c",
      dark: "#504214",
    },
  ];

  const randomIndex = parseInt(Math.random() * 1000) % colors.length;
  const theme = colors[randomIndex];

  if (document) {
    var r = document.querySelector(":root");
    r.style.setProperty("--website-color", theme.regular);
    r.style.setProperty("--dark", theme.dark);
    r.style.setProperty("--blue-gray", `${theme.regular}20`);
    r.style.setProperty("--website-color-banner", `${theme.regular}70`);
    r.style.setProperty("--website-color-opacity-low", `${theme.regular}20`);
    r.style.setProperty("--dropdown-color", lightenDarkenColor(theme.regular, 20));
    r.style.setProperty("--color-secondary-header", lightenDarkenColor(theme.regular, -20));
    r.style.setProperty("--website-color-light", `${theme.regular}20`);
  }
};


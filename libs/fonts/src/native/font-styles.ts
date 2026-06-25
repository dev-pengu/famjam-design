import { FontFamily } from '@famjam/tokens/ui.styles';

const fontFamilyRoboto = FontFamily.Roboto;

const FJ_FONT_STYLES = ['normal', 'italic'] as const;
const FJ_FONT_WEIGHTS = [300, 400, 500, 600, 700] as const;

export type FJFontStyle = (typeof FJ_FONT_STYLES)[number];
export type FJFontWeight = (typeof FJ_FONT_WEIGHTS)[number];
export type FJFontWeightInput = FJFontWeight | `${FJFontWeight}`;

type FJFontVariant = `${FJFontStyle}-${FJFontWeight}`;
type FJFontVariantMap = Record<FJFontVariant, string>;

function createFontVariantMap(
  resolver: (fontStyle: FJFontStyle, fontWeight: FJFontWeight) => string,
): FJFontVariantMap {
  return FJ_FONT_STYLES.reduce((acc, fontStyle) => {
    FJ_FONT_WEIGHTS.forEach((fontWeight) => {
      const variant: FJFontVariant = `${fontStyle}-${fontWeight}`;
      acc[variant] = resolver(fontStyle, fontWeight);
    });
    return acc;
  }, {} as FJFontVariantMap);
}

function robotoResolver(fontStyle: FJFontStyle, fontWeight: FJFontWeight) {
  const isItalic = fontStyle === 'italic';
  const variantNameByWeight: Record<FJFontWeight, string> = {
    300: 'Light',
    400: isItalic ? '' : 'Regular',
    500: 'Medium',
    600: 'SemiBold',
    700: 'Bold',
  };
  const postScriptName = `Roboto-${variantNameByWeight[fontWeight]}`;
  if (isItalic) return `${postScriptName}Italic`;
  return postScriptName;
}

const FJ_FONT_POSTSCRIPT_NAMES: Record<string, FJFontVariantMap> = {
  [fontFamilyRoboto]: createFontVariantMap(robotoResolver),
};

function getFontPostScriptName(fontFamily: string, fontStyle: FJFontStyle, fontWeight: FJFontWeight) {
  const postScriptGroup = FJ_FONT_POSTSCRIPT_NAMES[fontFamily];

  if (!postScriptGroup) {
    return fontFamily;
  }

  const variant: FJFontVariant = `${fontStyle}-${fontWeight}`;
  const mappedFamilyName = postScriptGroup[variant] ?? fontFamily;
  return mappedFamilyName;
}

function normalizeFontWeight(fontWeight: FJFontWeightInput): FJFontWeight {
  if (typeof fontWeight === 'string') {
    return Number(fontWeight) as FJFontWeight;
  }

  return fontWeight;
}

export function fontFamilyStyles({
  fontFamily = fontFamilyRoboto,
  fontStyle = 'normal',
  fontWeight = 400,
}: {
  fontFamily?: string;
  fontStyle?: FJFontStyle;
  fontWeight?: FJFontWeightInput;
} = {}) {
  const normalizedFontWeight = normalizeFontWeight(fontWeight);
  const mappedFamilyName = getFontPostScriptName(fontFamily, fontStyle, normalizedFontWeight);
  return {
    fontFamily: mappedFamilyName,
    fontStyle,
    fontWeight: normalizedFontWeight,
  };
}

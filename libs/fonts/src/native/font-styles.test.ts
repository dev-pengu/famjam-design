import { fontFamilyStyles } from './font-styles';

describe('fontFamilyStyles', () => {
  describe('fontFamilyStyles with IBM Plex', () => {
    const robotoFamily = 'Roboto';
    const normalCases = [
      { weight: 300, expectedFamily: 'Roboto-Light' },
      { weight: 400, expectedFamily: 'Roboto-Regular' },
      { weight: 500, expectedFamily: 'Roboto-Medium' },
      { weight: 600, expectedFamily: 'Roboto-SemiBold' },
      { weight: 700, expectedFamily: 'Roboto-Bold' },
    ] as const;

    it.each(normalCases)(
      'should return correct postscript name for normal weight $weight',
      ({ weight, expectedFamily }) => {
        const result = fontFamilyStyles({
          fontFamily: robotoFamily,
          fontStyle: 'normal',
          fontWeight: weight,
        });

        expect(result.fontFamily).toBe(expectedFamily);
        expect(result.fontStyle).toBe('normal');
        expect(result.fontWeight).toBe(weight);
      },
    );

    describe('italic variants', () => {
      const italicCases = [
        { weight: 300, expectedFamily: 'Roboto-LightItalic' },
        { weight: 400, expectedFamily: 'Roboto-Italic' },
        { weight: 700, expectedFamily: 'Roboto-BoldItalic' },
      ] as const;

      it.each(italicCases)(
        'should return correct postscript name for italic weight $weight',
        ({ weight, expectedFamily }) => {
          const result = fontFamilyStyles({
            fontFamily: robotoFamily,
            fontStyle: 'italic',
            fontWeight: weight,
          });

          expect(result.fontFamily).toBe(expectedFamily);
          expect(result.fontStyle).toBe('italic');
          expect(result.fontWeight).toBe(weight);
        },
      );
    });
  });

  it('should convert string font weights to numbers', () => {
    const result = fontFamilyStyles({ fontFamily: 'TestFamily', fontWeight: '700' });
    expect(result.fontWeight).toBe(700);
    expect(typeof result.fontWeight).toBe('number');
  });

  it('shoould return the family name and styles as-is for unknown families', () => {
    const customFamily = 'My Custom Font';
    const result = fontFamilyStyles({
      fontFamily: customFamily,
      fontStyle: 'normal',
      fontWeight: 400,
    });

    expect(result.fontFamily).toBe(customFamily);
    expect(result.fontStyle).toBe('normal');
    expect(result.fontWeight).toBe(400);
  });

  it('should use default values when not provided', () => {
    const result = fontFamilyStyles();

    expect(result.fontStyle).toBe('normal');
    expect(result.fontWeight).toBe(400);
    expect(result.fontFamily).toBe('Roboto-Regular');
  });
});

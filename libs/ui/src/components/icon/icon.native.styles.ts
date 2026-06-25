type IconStyleTokens = {
  icon?: {
    color?: string;
  };
};

export const createIconStyles = (tokens: IconStyleTokens) => {
  return {
    defaultColor: tokens.icon?.color,
  };
};

export const truncateMultilineTextProperties = (lines: number) => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: `${lines}`,
  overflow: 'hidden',
});

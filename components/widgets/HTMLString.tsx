type HTMLStringType = {
  strTag: string;
  className?: string;
  isParagrap?: boolean;
};

export default function HTMLString({ strTag, className, isParagrap = false }: HTMLStringType) {
  return isParagrap ? (
    <p className={className} dangerouslySetInnerHTML={{ __html: strTag }} />
  ) : (
    <div className={className} dangerouslySetInnerHTML={{ __html: strTag }} />
  );
}

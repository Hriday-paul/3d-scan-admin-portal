interface SectionTitleProps {
  title: string;
  className?: string;
}
const NSPageSectionTitle = ({ title, className = "" }: SectionTitleProps) => {
  return (
    <>
      <h2
        className={`${className} text-4xl font-semibold text-sc-charcoal-logic mb-4 lg:mb-6`}
      >
        {title}
      </h2>
    </>
  );
};

export default NSPageSectionTitle;

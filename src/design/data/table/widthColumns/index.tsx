import { Col } from "@inubekit/inubekit";
import { IWidthColmnsData } from "@ptypes/design/IWidthColmnsData";

const WidthColmnsData = (props: IWidthColmnsData) => {
  const { titleColumns, widthPercentageTotalColumns, columnWidths } = props;
  const calculateSize = (totalWidth: number, length: number) =>
    totalWidth / length;

  const defaultSize = calculateSize(
    widthPercentageTotalColumns ?? 80,
    titleColumns.length,
  );

  return (
    <>
      {titleColumns.map((title, index) => (
        <Col
          key={title.id}
          width={
            columnWidths?.[index] !== undefined
              ? `${columnWidths[index]}%`
              : `${defaultSize}%`
          }
        />
      ))}
    </>
  );
};

export { WidthColmnsData };

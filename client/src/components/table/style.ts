import styled, { css } from "styled-components";
import { primaryColors } from "@commons/global";
import { BaseTitle } from "@commons/page-title";

const getCellWidth = (width: string | number) =>
  !isNaN(+width) ? `${width}px` : width;

export const TableContainer = styled.div<any>`
  position: relative;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: ${({ width }) => width};
  ${({ margin }) => margin && `margin: ${margin}`};
  ${({ padding }) => padding && `padding: ${padding}`};
  ${({ order }) => order && `order: ${order}`};
`;

export const TableContentWrapper = styled.div<any>`
  width: 100%;
  max-height: ${({ height }) => height};
  overflow-y: ${({ overflowY }) => overflowY};
  position: relative;
  height: ${({ fixedHeight }) => fixedHeight};
  overflow-x: auto;
`;

export const StyledHeader = styled.thead<any>`
  background-color: ${primaryColors.primary};
  color: ${primaryColors.white};
`;

export const StyledTable = styled.table<any>`
  border-collapse: separate;
  table-layout: auto;
  border-spacing: 0;
  max-width: 100%;
  ${({ fixedHeight }) => fixedHeight && `height: ${fixedHeight}`}
`;

export const StyledTableRowCell = styled.td<any>`
  position: relative;
  padding: 0;
  margin: 0;
  border: 0.1px solid ${primaryColors.inputBorderColor};
  color: currentColor;
  font-size: ${({ fontSize }) => fontSize};
  ${({ isHeadCell }) =>
    isHeadCell &&
    `
    background-color: ${primaryColors.primary};
    position: sticky;
    top: 0;
    font-weight: bold;
    z-index: 1;
  `};
  ${({ width }) =>
    width &&
    `
    width: ${getCellWidth(width)};
  `};

  ${({ noBorder }) =>
    !noBorder &&
    `
  `};

  ${({ disabled }) =>
    disabled &&
    `
    cursor: not-allowed;
  `};
  transition: all 0.3s ease;
`;

export const ellipsisCss = css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const CellContentWrapper = styled(BaseTitle)<any>`
  display: flex;
  ${({ justify, align }) => `
    justify-content: ${justify || "cen ter"};
    align-items: ${align || "center"};
  `}
  position: relative;
  ${({ display }) => display && `display: ${display}`};
  width: ${({ width }) => (width ? getCellWidth(width) : "unset")};
  ${({ ellipsis }) => ellipsis === "true" && ellipsisCss}
  text-align: ${({ align }) => align || "center"};
  font-size: inherit;
  color: inherit;
  justify-content: ${({ align }) => align || "center"};
  padding: ${({ padding }) => padding || "3px"};
  ${({ minHeight }) => minHeight && `min-height: ${minHeight}`};
  ${({ useInlineEndBorder }) =>
    useInlineEndBorder &&
    `
    &:not(:last-child) {
      border-inline-end: 1px solid red;
    }
  `};
  ${({ color, backgroundColor }) =>
    css`
      background-color: ${backgroundColor || "unset"};
      color: ${color || "unset"};
    `};
  word-break: unset;
  word-wrap: anywhere;
  transition: all 0.3s ease-in-out;
`;
CellContentWrapper.defaultProps = {
  tag: "div",
};

export const BodyRow = styled.tr<any>`
  ${({ selected, selectedRowBackgroundColor }) =>
    !!selected
      ? //@ts-ignore
        `background-color: ${primaryColors[selectedRowBackgroundColor]}`
      : `background-color: ${primaryColors.white2}`};
  transition: all 0.3s ease-in-out;
`;

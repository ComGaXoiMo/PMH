import React, { CSSProperties } from 'react'

export const FilterIcon = props => <img src="/assets/icons/filter.svg" />
export const ExcelIcon = props =>  <img src="/assets/icons/excel.svg" />
export const PdfIcon = props => <img src="/assets/icons/pdf.svg" />
export const WordIcon = props => <img src="/assets/icons/word.svg" />
export const PowerPointIcon = props => <img src="assets/icons/power-point.svg" />
export const ImageIcon = props => <img src="/assets/icons/image-file.svg" className={props?.imageClass}/>
export const OtherFileIcon = props => <img src="/assets/icons/other-file.svg" />
export const BuildingIcon = props => <img src="/assets/icons/.svg" />


type IconCustomProps = {
  iconPath: string
  className?: string | undefined
  style?: CSSProperties | undefined
}

export function IconCustom({iconPath, ...res}: IconCustomProps) {

  return (<img src={iconPath} {...res}/>)
}

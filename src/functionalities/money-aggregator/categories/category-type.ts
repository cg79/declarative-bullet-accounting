import { ColorPickerHSBType, ColorPickerRGBType } from 'primereact/colorpicker';
import { Nullable } from 'primereact/ts-helpers';

export type CategoryPropsType = {
  income: number;
  expense: number;
  available: number;
};

export interface ICategory {
  _id: string;
  parentId: string | null;
  label: string;
  icon: string;
  description: string;
  children: ICategory[];
  date: number;
  available: number;
  expense: number;
  income: number;
  blocked: number;

  parentIds: string[];

  isCollapsed?: boolean;

  parent?: ICategory;
  level: number;
  props: CategoryPropsType;
  color?: string;
}
export type AggregateCategory = {
  [category_id: string]: CategoryPropsType;
};

export interface ICategory {
  _id: string;
  parentId: string | null;
  label: string;
  icon: string;
  description: string;
  children?: ICategory[];
  addedDate?: number;
  transactionsAmount: number;
  childTransactionsAmount: number;
  spent: number;
  blocked: number;
  parentIds: string[];

  isCollapsed?: boolean;

  parent?: ICategory;
  level: number;
  props: any;
}

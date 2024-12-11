/* eslint-disable @typescript-eslint/no-namespace */
export namespace Table {
  export interface Pageable {
    pageNumber: number;
    pageSize: number;
    total: number;
    start: string;
    end: string;
    hasNext: boolean;
    hasPrevious: boolean;
    tableType?: string;
  }
  export interface StateProps {
    tableData: any[];
    pageable: Pageable;
    searchParam: {
      [key: string]: any;
    };
    searchInitParam: {
      [key: string]: any;
    };
    totalParam: {
      [key: string]: any;
    };
    icon?: {
      [key: string]: any;
    };
  }
}

export namespace HandleData {
  export type MessageType = "" | "success" | "warning" | "info" | "error";
}

export namespace Theme {
  export type ThemeType = "light" | "inverted" | "dark";
  export type GreyOrWeakType = "grey" | "weak";
}

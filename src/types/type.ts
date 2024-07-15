export type Section = {
    sectionId: string;
    sectionName: string;
    width: number[];
    sectionData: Cell[][];
};
export type Cell = {
    id: string; // <uuid>
    type: string; // 文字|自由填答|單選題|巢狀單選|巢狀多選|勾選題|null
    bold: boolean; // true|false
    color: string; // light|dark
    history: string; // <對應"歷史填答"資料id>
    more: string; // <"更多"內容>
    size: number; // "10px"(L)|(M)|(S)
    content: string; // <附屬資料>
    rowSpan: string; // <寬>|full
    colSpan: string; // <高>|full
    simplifiedVersion: boolean; // <精簡版>  
}
export type CellIndex = {
    i: number;
    j: number;
}
export type Res = {
    ok: boolean;
    error: string;
}
export type ResponseType = {
    [key: string]: string;
}
  
export const sortArrayOfObjectsByLabelKr = (a: any, b: any) => {
  return (a.label_kr < b.label_kr) ? -1:((a.label_kr===b.label_kr) ? 0:1);
}

export const sortArrayOfObjectsByLabelEn = (a: any, b: any) => {
  return (a.label_en < b.label_en) ? -1:((a.label_en===b.label_en) ? 0:1);
}

export const sortArrayOfObjectsByName = (a: any, b: any) => {
  return (a.name < b.name) ? -1:((a.name===b.name) ? 0:1);
}

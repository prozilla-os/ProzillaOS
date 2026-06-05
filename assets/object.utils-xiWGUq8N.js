function t(s) {
  return s != null && typeof s == "object" && !Array.isArray(s);
}
function n(s, ...i) {
  const e = { ...s };
  for (const o of i)
    for (const r in o)
      t(e[r]) && t(o[r]) ? e[r] = n(e[r], o[r]) : Array.isArray(e[r]) && Array.isArray(o[r]) ? e[r] = e[r].concat(o[r]) : o[r] !== void 0 && (e[r] = o[r]);
  return e;
}
export {
  t as i,
  n as m
};
//# sourceMappingURL=object.utils-xiWGUq8N.js.map

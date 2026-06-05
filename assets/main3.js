(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode("._CircuitView_dfvf4_1{display:flex;width:100%;height:calc(100% - var(--header-height));flex-grow:1}._Canvas_dfvf4_8{flex:1;width:100%;height:100%}._LogicSim_k1eu4_1{display:flex;flex-direction:column;width:100%;height:100%}._LogicSim_k1eu4_1{--black-0: hsl(210, 15%, 55%);--black-1: hsl(210, 15%, 40%);--black-2: hsl(210, 15%, 30%);--black-3: hsl(210, 15%, 20%);--black-4: hsl(210, 15%, 12.5%)}")),document.head.appendChild(e)}}catch(i){console.error("vite-plugin-css-injected-by-js",i)}})();
import { Actions as F, ClickAction as w, useAppFolder as V, useSingleton as X, useManualContextMenu as Y, HeaderMenu as Z, DropdownAction as E, Divider as I, openUrl as G, App as _ } from "@prozilla-os/core";
import { jsxs as v, jsx as u, Fragment as q } from "react/jsx-runtime";
import { useRef as K, useEffect as Q } from "react";
import { Vector2 as l, removeFromArray as ii, clamp as ti } from "@prozilla-os/shared";
import { MinimalSkin as si, Skin as L, PixelSkin as ei } from "@prozilla-os/skins";
const ni = "_CircuitView_dfvf4_1", oi = "_Canvas_dfvf4_8", T = {
  CircuitView: ni,
  Canvas: oi
};
class d {
  value;
  static LOW = new d(0);
  static HIGH = new d(1);
  constructor(i) {
    this.value = i;
  }
  static invert(i) {
    return new d(1 - i.value);
  }
  isEqual(i) {
    return this.value === i.value;
  }
  isLow() {
    return this.value === 0;
  }
  isHigh() {
    return this.value === 1;
  }
}
const y = {
  default: "default",
  pointer: "pointer"
}, B = "outfit", D = {
  padding: 30,
  borderWidth: 7.5
}, c = {
  radius: 25,
  borderWidth: 5,
  pinOffset: 42.5,
  connectorWidth: 7.5,
  handleWidth: 15,
  handleHeight: 50,
  handleTrackWidth: 22.5,
  placingOpacity: 0.5
}, W = {
  width: 5,
  snappingSensitivity: 10,
  cornerRadius: 25,
  resolution: 8
}, h = {
  radius: 10,
  label: {
    offset: 10,
    fontSize: 15,
    padding: 5
  }
}, g = {
  BorderWidth: 5,
  padding: 10,
  fontSize: 35,
  placingOutline: 10
}, p = {
  pin: {
    fill: "black-4",
    fillHover: "black-3",
    labelText: "white-0",
    labelBackground: "black-4"
  },
  controller: {
    stroke: "black-4",
    connector: "black-4",
    on: "red-0",
    off: "red-2",
    hover: "white-0",
    handle: "black-3",
    handleHover: "black-4"
  },
  background: {
    border: "black-0",
    outer: "black-1",
    inner: "black-2",
    margin: "black-2"
  },
  chip: {
    text: "black-4",
    outline: "white-0"
  }
};
class b {
  id;
  name;
  position = l.ZERO;
  attachedChip;
  circuit;
  state = d.LOW;
  isInput;
  isControlled = !1;
  outputWires = [];
  constructor(i, t, s, e, o) {
    Object.assign(this, { circuit: i, name: t, isInput: s, attachedChip: e }), this.id = o ?? this.circuit.getUniqueId();
  }
  getRawPosition() {
    return l.product(this.position, this.circuit.size);
  }
  addOutputWire(i) {
    this.outputWires.push(i), i.setState(this.state);
  }
  setState(i) {
    this.state.isEqual(i) || (this.state = i, this.update());
  }
  update() {
    this.outputWires.forEach((i) => {
      i.setState(this.state);
    }), this.attachedChip.update();
  }
  get isPointingRight() {
    return this.isInput === this.isControlled;
  }
  draw(i) {
    let t = p.pin.fill;
    const { x: s, y: e } = this.getRawPosition();
    if (this.circuit.inputHandler.rawMousePosition.getDistance(this.position.x * this.circuit.size.x, e) <= h.radius) {
      this.circuit.cursor = y.pointer, t = p.pin.fillHover;
      let o = s;
      const r = this.isPointingRight, n = this.circuit.getTextRect(h.label.fontSize, this.name);
      r ? o += h.radius + h.label.offset : o -= h.radius + h.label.offset;
      const a = {
        x: n.x + h.label.padding * 2,
        y: n.y + h.label.padding * 2
      };
      this.circuit.drawRect(
        this.circuit.getColor(p.pin.labelBackground),
        r ? o : o - a.x,
        e - n.y / 2 - h.label.padding,
        a.x,
        a.y
      ), r ? o += h.label.padding : o -= h.label.padding, this.circuit.drawText(
        this.circuit.getColor(p.pin.labelText),
        r ? "left" : "right",
        o,
        e,
        h.label.fontSize,
        this.name
      );
    }
    i && this.circuit.setDrawingOpacity(c.placingOpacity), this.circuit.drawCircle(
      this.circuit.getColor(t),
      s,
      e,
      h.radius
    ), i && this.circuit.resetDrawingOpacity();
  }
  toJson() {
    return {
      name: this.name,
      id: this.id,
      position: this.position
    };
  }
}
class C {
  color;
  name;
  position = l.ZERO;
  size;
  circuit;
  isCircuit = !1;
  isBlueprint = !1;
  inputCount = 0;
  outputCount = 0;
  inputPins;
  outputPins;
  logic;
  constructor(i, t, s, e, o, r) {
    if (Object.assign(this, { circuit: i, name: t, color: s, isBlueprint: e, inputCount: o, outputCount: r }), i == null && !e && this instanceof N && (this.circuit = this, this.isCircuit = !0), !(this.isCircuit || this.isBlueprint)) {
      if (i != null) {
        const n = this.circuit.getTextRect(g.fontSize, this.name), a = n.x + (g.padding + g.BorderWidth) * 2, P = n.y + (g.padding + g.BorderWidth) * 2;
        this.size = new l(a, P);
      }
      this.inputPins = [];
      for (let n = 0; n < o; n++) {
        const a = new b(this.circuit, "IN " + n, !0, this);
        this.inputPins.push(a), this.isCircuit && (a.isControlled = !0);
      }
      this.outputPins = [];
      for (let n = 0; n < r; n++) {
        const a = new b(this.circuit, "OUT " + n, !1, this);
        this.outputPins.push(a), this.isCircuit && (a.isControlled = !0);
      }
    }
  }
  setCircuit(i) {
    this.circuit = i, this.inputPins.concat(this.outputPins).forEach((t) => {
      t.circuit = i;
    });
  }
  setLogic(i) {
    return this.logic = i, this;
  }
  update() {
    if (this.logic == null)
      return;
    const i = [];
    for (let s = 0; s < this.inputCount; s++) {
      const e = this.inputPins[s].state ?? d.LOW;
      i.push(e);
    }
    const t = this.logic(i);
    for (let s = 0; s < this.outputCount; s++)
      this.outputPins[s].setState(t[s]);
  }
  drawPins(i = !0) {
    this.inputPins.forEach((t, s) => {
      if (i) {
        const o = (this.size.y - this.inputCount * h.radius * 2) / (this.inputCount + 1);
        t.position.x = this.position.x, t.position.y = this.position.y + (o * (s + 1) + h.radius * (2 * s + 1)) / this.circuit.size.y;
      }
      const e = this.circuit.inputHandler.isPlacingPin(t, s);
      t.draw(e);
    }), this.outputPins.forEach((t, s) => {
      if (i) {
        const o = (this.size.y - this.outputCount * h.radius * 2) / (this.outputCount + 1);
        t.position.x = this.position.x + this.size.x / this.circuit.size.x, t.position.y = this.position.y + (o * (s + 1) + h.radius * (2 * s + 1)) / this.circuit.size.y;
      }
      const e = this.circuit.inputHandler.isPlacingPin(t, s);
      t.draw(e);
    });
  }
  getBounds() {
    return {
      position: l.product(this.position, this.circuit.size),
      size: this.size
    };
  }
  draw(i) {
    const { position: t, size: s } = this.getBounds();
    this.circuit.drawRect(
      this.circuit.getColor(this.color + "-1"),
      t.x,
      t.y,
      s.x,
      s.y
    ), this.circuit.drawRect(
      this.circuit.getColor(this.color + "-0"),
      t.x + g.BorderWidth,
      t.y + g.BorderWidth,
      s.x - g.BorderWidth * 2,
      s.y - g.BorderWidth * 2
    ), this.circuit.drawText(
      this.circuit.getColor(p.chip.text),
      "center",
      t.x + s.x / 2,
      t.y + s.y / 2,
      g.fontSize,
      this.name
    ), i && (this.circuit.setDrawingOpacity(0.25), this.circuit.drawRect(
      this.circuit.getColor(p.chip.outline),
      t.x - g.placingOutline,
      t.y - g.placingOutline,
      s.x + g.placingOutline * 2,
      s.y + g.placingOutline * 2
    ), this.circuit.resetDrawingOpacity()), this.drawPins();
  }
  delete() {
    ii(this, this.circuit.chips);
  }
  toJson() {
    const i = {
      color: this.color,
      name: this.name,
      position: {
        x: this.position.x,
        y: this.position.y
      }
    };
    return this.inputPins.length > 0 && (i.inputPins = this.inputPins.map((t) => t.toJson())), this.outputPins.length > 0 && (i.outputPins = this.outputPins.map((t) => t.toJson())), i;
  }
}
class R extends b {
  constructor(i, t, s, e) {
    super(i, t, s, i, e), this.isControlled = !0;
  }
  drawControllerHandle(i) {
    const t = { x: c.handleWidth, y: c.handleHeight }, s = this.getRawPosition();
    let e = s.x;
    const o = s.y - t.y / 2;
    this.isInput ? e -= c.pinOffset + c.handleTrackWidth + c.handleHeight / 2 : e += c.pinOffset + (c.handleTrackWidth - c.handleWidth) + c.handleHeight / 2;
    const r = {
      position: new l(e, o),
      size: new l(t.x, t.y)
    };
    let n;
    this.circuit.isPointInsideRect(r, this.circuit.inputHandler.rawMousePosition) ? (n = p.controller.handleHover, this.circuit.cursor = y.pointer) : n = p.controller.handle, i && this.circuit.setDrawingOpacity(c.placingOpacity), this.circuit.drawRect(
      this.circuit.getColor(n),
      r.position.x,
      r.position.y,
      r.size.x,
      r.size.y
    ), i && this.circuit.resetDrawingOpacity();
  }
  drawController(i) {
    const t = this.getRawPosition(), s = this.isInput ? t.x - c.pinOffset : t.x + c.pinOffset, e = t.y;
    let o;
    this.state.value === 1 ? o = p.controller.on : o = p.controller.off, i && this.circuit.setDrawingOpacity(c.placingOpacity), this.circuit.drawCircle(
      this.circuit.getColor(p.controller.stroke),
      s,
      e,
      c.radius
    ), this.circuit.drawCircle(
      this.circuit.getColor(o),
      s,
      e,
      c.radius - c.borderWidth
    ), this.isInput && this.isControlled && !i && this.circuit.inputHandler.rawMousePosition.getDistance(s, e) <= c.radius && (this.circuit.setDrawingOpacity(0.125), this.circuit.drawCircle(
      this.circuit.getColor(p.controller.hover),
      s,
      e,
      c.radius - c.borderWidth
    ), this.circuit.resetDrawingOpacity(), this.circuit.cursor = y.pointer), i && this.circuit.resetDrawingOpacity();
  }
  drawConnector(i) {
    if (i)
      return;
    const t = this.getRawPosition(), s = this.isInput ? t.x - c.pinOffset : t.x, e = t.y;
    i && this.circuit.setDrawingOpacity(c.placingOpacity), this.circuit.drawRect(
      this.circuit.getColor(p.controller.connector),
      s,
      e - c.connectorWidth / 2,
      c.pinOffset,
      c.connectorWidth
    ), i && this.circuit.resetDrawingOpacity();
  }
  draw(i) {
    this.isInput ? this.position.x = (c.handleTrackWidth + c.pinOffset + c.radius) / this.circuit.size.x : this.position.x = (this.circuit.size.x - (c.handleTrackWidth + c.pinOffset + c.radius)) / this.circuit.size.x, this.drawConnector(i), this.drawController(i), this.drawControllerHandle(i), super.draw(i);
  }
}
class U {
  color;
  state = d.LOW;
  inputPin;
  outputPin;
  anchorPoints = [];
  circuit;
  placedBackwards = !1;
  constructor(i, t, s, e, o = []) {
    Object.assign(this, { circuit: i, color: t, inputPin: s, outputPin: e, anchorPoints: o });
  }
  setState(i) {
    this.state.isEqual(i) || (this.state = i, this.update());
  }
  update() {
    this.outputPin != null && this.outputPin.setState(this.state);
  }
  draw(i) {
    const t = [...this.anchorPoints];
    this.inputPin != null && (this.placedBackwards ? t.push(this.inputPin.position) : t.unshift(this.inputPin.position)), this.outputPin != null && (this.placedBackwards ? t.unshift(this.outputPin.position) : t.push(this.outputPin.position));
    let s;
    i ? s = `${this.color}-2` : this.state.value === 1 ? s = `${this.color}-0` : s = `${this.color}-2`;
    const e = t.map((o) => l.product(o, this.circuit.size));
    this.circuit.drawCurvedLine(this.circuit.getColor(s), e, W.width, W.cornerRadius, W.resolution);
  }
  toJson() {
    const i = {
      color: this.color
    };
    return this.inputPin != null && (i.inputId = this.inputPin.id), this.outputPin != null && (i.outputId = this.outputPin.id), this.anchorPoints.length && (i.anchorPoints = this.anchorPoints), i;
  }
}
function ri({ chip: f, ...i }) {
  return /* @__PURE__ */ v(F, { ...i, children: [
    /* @__PURE__ */ u(w, { label: "Delete", onTrigger: () => {
      f.delete();
    } }),
    /* @__PURE__ */ u(w, { label: "Duplicate", onTrigger: () => {
      f.circuit.inputHandler.startChipPlacement(f);
    } })
  ] });
}
class ci {
  circuit;
  canvas;
  mousePosition = l.ZERO;
  rawMousePosition = l.ZERO;
  isPlacing = !1;
  snapping = !1;
  placingOffset = l.ZERO;
  previousPlacement;
  placingWire;
  placingChip;
  placingPin;
  constructor(i) {
    this.circuit = i;
  }
  setMousePosition(i) {
    const t = this.canvas.getBoundingClientRect();
    this.rawMousePosition.x = i.clientX - t.left, this.rawMousePosition.y = i.clientY - t.top, this.mousePosition.x = this.rawMousePosition.x / this.circuit.size.x, this.mousePosition.y = this.rawMousePosition.y / this.circuit.size.y;
  }
  init() {
    this.canvas = this.circuit.canvas, this.mousePosition = l.ZERO, this.canvas.addEventListener("mousemove", this.onMouseMove), this.canvas.addEventListener("mouseup", this.onMouseUp), this.canvas.addEventListener("contextmenu", this.onMouseUp), this.canvas.addEventListener("mousedown", this.onMouseDown), this.canvas.addEventListener("mouseleave", this.onMouseLeave), window.addEventListener("keydown", this.onKeyDown), window.addEventListener("keyup", this.onKeyUp);
  }
  cleanup() {
    this.canvas.removeEventListener("mousemove", this.onMouseMove), this.canvas.removeEventListener("mouseup", this.onMouseUp), this.canvas.removeEventListener("contextmenu", this.onMouseUp), this.canvas.removeEventListener("mousedown", this.onMouseDown), this.canvas.removeEventListener("mouseleave", this.onMouseLeave), window.removeEventListener("keydown", this.onKeyDown), window.removeEventListener("keyup", this.onKeyUp);
  }
  reset() {
    this.placingWire = null, this.placingChip = null, this.placingPin = null, this.previousPlacement = null, this.placingOffset = l.ZERO, this.isPlacing = !1;
  }
  onMouseMove = (i) => {
    if (i != null && this.setMousePosition(i), this.placingWire != null) {
      this.updateWirePlacement();
      return;
    }
    if (this.placingChip != null) {
      this.updateChipPlacement();
      return;
    }
    const t = (s) => {
      const e = s.position.y * this.circuit.size.y, o = e - c.handleHeight / 2, r = e + c.handleHeight / 2;
      return this.rawMousePosition.y > o && this.rawMousePosition.y < r;
    };
    if (this.placingPin != null) {
      let s = this.rawMousePosition.x > c.handleTrackWidth && this.rawMousePosition.x < this.circuit.size.x - c.handleTrackWidth;
      if (s) {
        this.cancelPinPlacement();
        return;
      }
      this.placingPin.isInput ? this.circuit.inputPins.forEach((e, o) => {
        s || o == this.circuit.inputPins.length - 1 || t(e) && (s = !0);
      }) : this.circuit.outputPins.forEach((e, o) => {
        s || o == this.circuit.outputPins.length - 1 || t(e) && (s = !0);
      }), s ? this.cancelPinPlacement() : this.updatePinPlacement();
    } else if (this.rawMousePosition.x < c.handleTrackWidth) {
      let s = !1;
      this.circuit.inputPins.forEach((e) => {
        s || t(e) && (s = !0);
      }), s || this.startPinPlacement(!0);
    } else if (this.rawMousePosition.x > this.circuit.size.x - c.handleTrackWidth) {
      let s = !1;
      this.circuit.outputPins.forEach((e) => {
        s || t(e) && (s = !0);
      }), s || this.startPinPlacement(!1);
    }
  };
  onClickPin(i) {
    this.placingWire != null ? this.endWirePlacement(i) : this.startWirePlacement(i);
  }
  openContextMenu(i, t) {
    i.stopPropagation();
    const s = new l(i.clientX, i.clientY);
    this.circuit.openContextMenu?.(s, t);
  }
  openChipContextMenu(i, t) {
    this.openContextMenu(i, (s) => ri({ chip: t, ...s }));
  }
  onMouseUp = (i) => {
    if (i.preventDefault(), this.setMousePosition(i), i.button === 2)
      if (this.placingWire != null)
        this.cancelWirePlacement();
      else if (this.placingChip != null)
        this.cancelChipPlacement();
      else {
        let t = !1;
        if (this.circuit.chips.forEach((s) => {
          this.circuit.isPointInsideRect(s.getBounds(), this.rawMousePosition) && (this.openChipContextMenu(i, s), t = !0);
        }), t)
          return;
      }
    else if (i.button === 0) {
      let t = !1;
      if (this.circuit.inputPins.forEach((s) => {
        const e = s.getRawPosition();
        this.rawMousePosition.getDistance(e.x - c.pinOffset, e.y) <= c.radius ? (s.setState(d.invert(s.state)), t = !0) : this.rawMousePosition.getDistance(e) <= h.radius && (this.onClickPin(s), t = !0);
      }), t || (this.circuit.outputPins.forEach((s) => {
        this.rawMousePosition.getDistance(s.getRawPosition()) <= h.radius && (this.onClickPin(s), t = !0);
      }), t) || (this.circuit.chips.forEach((s) => {
        s.inputPins.concat(s.outputPins).forEach((e) => {
          this.rawMousePosition.getDistance(e.getRawPosition()) <= h.radius && (this.onClickPin(e), t = !0);
        });
      }), t))
        return;
      this.placingWire != null && this.anchorWirePlacement(), this.placingChip != null && this.endChipPlacement(), this.placingPin != null && this.endPinPlacement();
    }
  };
  onMouseDown = (i) => {
    i.preventDefault(), this.setMousePosition(i), !(i.button !== 0 || this.isPlacing) && this.circuit.chips.forEach((t, s) => {
      if (!this.isPlacing && this.circuit.isPointInsideRect(t, this.mousePosition)) {
        let e = !1;
        t.inputPins.concat(t.outputPins).forEach((o) => {
          o.position.getDistance(this.mousePosition.x, this.mousePosition.y) <= h.radius && (e = !0);
        }), e || this.editChipPlacement(t, s);
      }
    });
  };
  onKeyDown = (i) => {
    switch (i.key) {
      case "Shift":
        i.preventDefault(), this.snapping = !0, this.onMouseMove();
        break;
      case "Backspace":
      case "Delete":
      case "Escape":
        i.preventDefault(), this.placingWire != null && this.cancelWirePlacement(), this.placingChip != null && this.cancelChipPlacement();
        break;
    }
  };
  onKeyUp = (i) => {
    i.key === "Shift" && (i.preventDefault(), this.snapping = !1, this.onMouseMove());
  };
  onMouseLeave = (i) => {
    this.cancelPinPlacement();
  };
  startWirePlacement(i) {
    const t = i.isPointingRight, s = t ? i : void 0, e = t ? void 0 : i, o = this.mousePosition.clone;
    this.placingWire = new U(this.circuit, "red", s, e, [o]), t || (this.placingWire.placedBackwards = !0), this.circuit.wires.push(this.placingWire);
  }
  snapWireHorizontally(i, t) {
    i.x = this.mousePosition.x, i.y = t.y;
    let s = [];
    this.circuit.wires.forEach((r, n) => {
      n < this.circuit.wires.length - 1 && (s = s.concat(r.anchorPoints));
    });
    let e, o;
    s.forEach((r) => {
      const n = Math.abs(this.mousePosition.x - r.x) * this.circuit.size.x;
      (o == null || o > n) && (e = r.x, o = n);
    }), o != null && e != null && o < W.snappingSensitivity && (i.x = e);
  }
  snapWireVertically(i, t) {
    i.x = t.x, i.y = this.mousePosition.y;
    let s;
    this.placingWire?.placedBackwards ? (s = this.circuit.inputPins, this.circuit.chips.forEach((r) => {
      s = s.concat(r.outputPins);
    })) : (s = this.circuit.outputPins, this.circuit.chips.forEach((r) => {
      s = s.concat(r.inputPins);
    }));
    let e, o;
    s.forEach((r) => {
      const n = Math.abs(this.mousePosition.y - r.position.y) * this.circuit.size.y;
      (o == null || o > n) && (e = r.position.y, o = n);
    }), o !== void 0 && e !== void 0 && o < W.snappingSensitivity && (i.y = e);
  }
  updateWirePlacement() {
    const i = this.placingWire?.anchorPoints.length;
    if (i == null) return;
    const t = this.placingWire?.anchorPoints[i - 1];
    if (t != null)
      if (!this.snapping)
        t.x = this.mousePosition.x, t.y = this.mousePosition.y;
      else {
        let s;
        if (i >= 2 ? s = this.placingWire?.anchorPoints[i - 2] : this.placingWire?.placedBackwards ? s = this.placingWire?.outputPin?.position : s = this.placingWire?.inputPin?.position, s == null) return;
        const e = Math.abs(this.mousePosition.x - s.x) * this.circuit.size.x, o = Math.abs(this.mousePosition.y - s.y) * this.circuit.size.y;
        e > o ? this.snapWireHorizontally(t, s) : this.snapWireVertically(t, s);
      }
  }
  anchorWirePlacement() {
    this.placingWire?.anchorPoints.push(this.mousePosition.clone);
  }
  cancelWirePlacement() {
    this.placingWire = null, this.isPlacing = !1, this.circuit.wires.pop();
  }
  endWirePlacement(i) {
    const t = i.isPointingRight;
    if (this.placingWire == null) return;
    let s = !1;
    !t && !this.placingWire.placedBackwards ? (this.placingWire.outputPin = i, s = !0) : t && this.placingWire.placedBackwards && (this.placingWire.inputPin = i, s = !0), s && (this.placingWire.anchorPoints.pop(), this.placingWire.inputPin?.addOutputWire(this.placingWire), this.placingWire.inputPin?.update(), this.placingWire = null, this.isPlacing = !1);
  }
  startChipPlacement(i) {
    const t = new C(this.circuit, i.name, i.color, !1, i.inputCount, i.outputCount);
    t.setLogic(i.logic), t.position = new l(
      this.mousePosition.x - t.size.x / 2 / this.circuit.size.x,
      this.mousePosition.y - t.size.y / 2 / this.circuit.size.y
    ), this.placingChip = t, this.isPlacing = !0, this.circuit.chips.push(t);
  }
  editChipPlacement(i, t) {
    this.placingOffset = new l(
      i.position.x + i.size.x / 2 / this.circuit.size.x - this.mousePosition.x,
      i.position.y + i.size.y / 2 / this.circuit.size.y - this.mousePosition.y
    ), this.previousPlacement = i.position.clone, this.circuit.chips.push(this.circuit.chips.splice(t, 1)[0]), this.placingChip = i, this.isPlacing = !0;
  }
  updateChipPlacement() {
    this.placingChip != null && (this.placingChip.position.x = this.mousePosition.x - this.placingChip.size.x / 2 / this.circuit.size.x + this.placingOffset.x, this.placingChip.position.y = this.mousePosition.y - this.placingChip.size.y / 2 / this.circuit.size.y + this.placingOffset.y);
  }
  cancelChipPlacement() {
    this.placingChip != null && (this.previousPlacement != null ? (this.placingChip.position = this.previousPlacement, this.previousPlacement = null) : this.circuit.chips.pop(), this.placingChip = null, this.isPlacing = !1);
  }
  endChipPlacement() {
    this.placingChip = null, this.isPlacing = !1, this.placingOffset = l.ZERO;
  }
  startPinPlacement(i) {
    const t = new R(this.circuit, "PIN", i);
    t.position.x = (c.handleTrackWidth + c.pinOffset + c.radius) / this.circuit.size.x, t.position.y = this.mousePosition.y, i ? this.circuit.inputPins.push(t) : (t.position.x = 1 - t.position.x, this.circuit.outputPins.push(t)), this.placingPin = t;
  }
  updatePinPlacement() {
    this.placingPin != null && (this.placingPin.position.y = this.mousePosition.y);
  }
  cancelPinPlacement() {
    this.placingPin != null && (this.placingPin?.isInput ? this.circuit.inputPins.pop() : this.circuit.outputPins.pop(), this.placingPin = null);
  }
  endPinPlacement() {
    this.placingPin = null;
  }
  isPlacingPin(i, t) {
    return !i.isControlled || this.placingPin == null || this.placingPin.isInput != i.isInput ? !1 : i.isInput ? t == this.circuit.inputPins.length - 1 : t == this.circuit.outputPins.length - 1;
  }
}
class N extends C {
  canvas;
  size = l.ZERO;
  context;
  colors = {};
  inputHandler;
  openContextMenu;
  inputPins = [];
  outputPins = [];
  wires = [];
  chips = [];
  cursor = y.default;
  lastId = 0;
  constructor(i, t, s, e) {
    super(null, i, t, !1, s, e), this.inputHandler = new ci(this);
  }
  resize() {
    this.size.x = this.canvas.clientWidth, this.size.y = this.canvas.clientHeight;
  }
  init(i) {
    this.canvas = i, this.context = this.canvas.getContext("2d"), this.resize(), new ResizeObserver((s) => {
      s.forEach(({ target: e }) => {
        e === this.canvas && (e.clientWidth != this.size.x || e.clientHeight != this.size.y) && this.resize();
      });
    }).observe(this.canvas), this.inputHandler.init(), this.render();
  }
  cleanup() {
    this.inputHandler.cleanup();
  }
  reset() {
    this.inputPins = [], this.outputPins = [], this.wires = [], this.chips = [], this.inputHandler.reset();
  }
  getColor(i) {
    if (this.colors[i] != null)
      return this.colors[i];
    const t = getComputedStyle(this.canvas).getPropertyValue("--" + i);
    return this.colors[i] = t, t;
  }
  isPointInsideRect(i, t) {
    return t.x > i.position.x && t.y > i.position.y && t.x < i.position.x + i.size.x && t.y < i.position.y + i.size.y;
  }
  getUniqueId() {
    return this.lastId++;
  }
  getTextRect(i, t) {
    this.context.textBaseline = "middle", this.context.font = `bold ${i}px ${B}`;
    const s = this.context.measureText(t), e = s.actualBoundingBoxRight + s.actualBoundingBoxLeft, o = s.actualBoundingBoxAscent + s.actualBoundingBoxDescent;
    return { x: e, y: o };
  }
  drawRect(i, t, s, e, o) {
    this.context.fillStyle = i, this.context.fillRect(t, s, e, o);
  }
  drawCircle(i, t, s, e) {
    this.context.beginPath(), this.context.arc(t, s, e, 0, 2 * Math.PI), this.context.fillStyle = i, this.context.fill();
  }
  drawCurvedLine(i, t, s, e, o) {
    if (t.length < 2)
      return;
    this.context.lineWidth = s, this.context.lineJoin = "round", this.context.lineCap = "round";
    const r = [];
    r.push(t[0]);
    for (let n = 1; n < t.length - 1; n++) {
      const a = t[n], P = l.normalize(l.difference(t[n], t[n - 1])), m = l.difference(t[n], t[n - 1]).magnitude, O = Math.max(m - e, m / 2), z = l.normalize(l.difference(t[n + 1], t[n])), H = l.difference(t[n + 1], t[n]).magnitude, j = l.sum(t[n - 1], l.scale(P, O)), A = l.sum(a, l.scale(z, Math.min(e, H / 2)));
      for (let k = 0; k < o; k++) {
        const M = k / (o - 1), J = l.lerp(j, a, M), $ = l.lerp(a, A, M), S = l.lerp(J, $, M);
        S.getDistanceSquared(r[r.length - 1]) > 1e-3 && r.push(S);
      }
    }
    r.push(t[t.length - 1]), this.context.beginPath(), this.context.moveTo(r[0].x, r[0].y);
    for (let n = 1; n < r.length; n++)
      this.context.lineTo(r[n].x, r[n].y);
    this.context.strokeStyle = i, this.context.stroke();
  }
  drawText(i, t, s, e, o, r) {
    this.context.fillStyle = i, this.context.textAlign = t, this.context.textBaseline = "middle", this.context.font = `bold ${o}px ${B}`, this.context.fillText(r, s, e);
  }
  setDrawingOpacity(i) {
    this.context.globalAlpha = ti(i, 0, 1);
  }
  resetDrawingOpacity() {
    this.setDrawingOpacity(1);
  }
  drawBackground() {
    const i = c.handleTrackWidth, t = D.padding;
    this.drawRect(this.getColor(p.background.margin), 0, 0, this.size.x, this.size.y);
    let s = 0;
    this.drawRect(
      this.getColor(p.background.outer),
      s + i,
      s,
      this.size.x - i * 2,
      this.size.y
    ), s = t - D.borderWidth, this.drawRect(
      this.getColor(p.background.border),
      s + i,
      s,
      this.size.x - s * 2 - i * 2,
      this.size.y - s * 2
    ), s = t, this.drawRect(
      this.getColor(p.background.inner),
      s + i,
      s,
      this.size.x - s * 2 - i * 2,
      this.size.y - s * 2
    );
  }
  drawWires() {
    this.wires.forEach((i, t) => {
      const s = this.inputHandler.placingWire != null && t == this.wires.length - 1;
      i.draw(s);
    });
  }
  drawChips() {
    this.chips.forEach((i, t) => {
      const s = this.inputHandler.placingChip != null && t == this.chips.length - 1;
      i.draw(s);
    });
  }
  draw() {
    this.drawBackground(), this.drawWires(), this.drawChips(), super.drawPins(!1);
  }
  render() {
    this.canvas.width != this.size.x && (this.canvas.width = this.size.x), this.canvas.height != this.size.y && (this.canvas.height = this.size.y), this.cursor = y.default, this.draw(), this.inputHandler.isPlacing ? this.canvas.style.cursor = y.default : this.canvas.style.cursor = this.cursor, window.requestAnimationFrame(() => {
      this.render();
    });
  }
  toJson() {
    const i = super.toJson();
    return this.wires.length > 0 && (i.wires = this.wires.map((t) => t.toJson())), this.chips.length > 0 && (i.chips = this.chips.map((t) => t.toJson())), i;
  }
  toString() {
    const i = this.toJson();
    return JSON.stringify(i);
  }
}
class x {
  static CHIPS = {
    and: new C(null, "AND", "blue", !0, 2, 1).setLogic((i) => i[0].isHigh() && i[1].isHigh() ? [d.HIGH] : [d.LOW]),
    not: new C(null, "NOT", "red", !0, 1, 1).setLogic((i) => [d.invert(i[0])]),
    or: new C(null, "OR", "yellow", !0, 2, 1).setLogic((i) => i[0].isHigh() || i[1].isHigh() ? [d.HIGH] : [d.LOW]),
    high: new C(null, "HIGH", "green", !0, 0, 1).setLogic((i) => [d.HIGH]),
    low: new C(null, "LOW", "purple", !0, 0, 1).setLogic((i) => [d.LOW])
  };
  static saveCircuit(i, t) {
    t.createFile(i.name, "json", (s) => {
      s.setContent(i.toString());
    });
  }
  static loadCircuit(i, t) {
    i.reset();
    const s = t.findFile(i.name, "json");
    s?.read().then((e) => {
      if (!e)
        return;
      const o = JSON.parse(e);
      i.color = o.color, i.name = o.name;
      const r = {};
      i.inputCount = o.inputPins?.length ?? 0, o.inputPins?.forEach((n) => {
        const a = new R(i, n.name, !0, n.id);
        a.position = new l(n.position.x, n.position.y), i.inputPins.push(a), r[n.id] = a;
      }), i.outputCount = o.outputPins?.length ?? 0, o.outputPins?.forEach((n) => {
        const a = new R(i, n.name, !1, n.id);
        a.position = new l(n.position.x, n.position.y), i.outputPins.push(a), r[n.id] = a;
      }), o.chips?.forEach((n) => {
        const a = new C(i, n.name, n.color, !1, 0, 0);
        a.position = new l(n.position.x, n.position.y), a.inputCount = n.inputPins?.length ?? 0, n.inputPins?.forEach((P) => {
          const m = new b(i, P.name, !0, a, P.id);
          a.inputPins.push(m), r[P.id] = m;
        }), a.outputCount = n.outputPins?.length ?? 0, n.outputPins?.forEach((P) => {
          const m = new b(i, P.name, !1, a, P.id);
          a.outputPins.push(m), r[P.id] = m;
        }), a.setLogic(x.CHIPS[n.name].logic), a.update(), i.chips.push(a);
      }), o.wires?.forEach((n) => {
        const a = n.inputId ? r[n.inputId] : void 0, P = n.outputId ? r[n.outputId] : void 0, m = n.anchorPoints?.map(({ x: z, y: H }) => new l(z, H)), O = new U(i, n.color, a, P, m);
        a?.addOutputWire(O), i.wires.push(O);
      });
    }).catch((e) => {
      console.error(e);
    });
  }
}
function ai({ app: f }) {
  const i = V(f), t = X(() => new N("Chip", "#000", 2, 1)), s = K(null), { openContextMenu: e } = Y();
  return t.openContextMenu = e, Q(() => {
    if (s.current != null)
      return t.init(s.current), () => {
        t.cleanup();
      };
  }, [s, t]), /* @__PURE__ */ v(q, { children: [
    /* @__PURE__ */ v(Z, { children: [
      /* @__PURE__ */ v(E, { label: "Circuit", showOnHover: !1, children: [
        /* @__PURE__ */ u(w, { label: "New", onTrigger: () => {
          t.reset();
        } }),
        /* @__PURE__ */ u(w, { label: "Save", onTrigger: () => {
          i != null && x.saveCircuit(t, i);
        } }),
        /* @__PURE__ */ u(w, { label: "Load", onTrigger: () => {
          i != null && x.loadCircuit(t, i);
        } })
      ] }),
      /* @__PURE__ */ v(E, { label: "Add", showOnHover: !1, children: [
        /* @__PURE__ */ u(w, { label: "AND gate", onTrigger: () => {
          t.inputHandler.startChipPlacement(x.CHIPS.and);
        } }),
        /* @__PURE__ */ u(w, { label: "NOT gate", onTrigger: () => {
          t.inputHandler.startChipPlacement(x.CHIPS.not);
        } }),
        /* @__PURE__ */ u(I, {}),
        /* @__PURE__ */ u(w, { label: "OR gate", onTrigger: () => {
          t.inputHandler.startChipPlacement(x.CHIPS.or);
        } }),
        /* @__PURE__ */ u(I, {}),
        /* @__PURE__ */ u(w, { label: "HIGH", onTrigger: () => {
          t.inputHandler.startChipPlacement(x.CHIPS.high);
        } }),
        /* @__PURE__ */ u(w, { label: "LOW", onTrigger: () => {
          t.inputHandler.startChipPlacement(x.CHIPS.low);
        } })
      ] }),
      /* @__PURE__ */ u(E, { label: "Help", showOnHover: !1, children: /* @__PURE__ */ u(w, { label: "Digital Electronics Glossary", onTrigger: () => {
        G("http://www.pmcgibbon.net/teachcte/electron/degloss1.htm");
      } }) })
    ] }),
    /* @__PURE__ */ u("div", { className: T.CircuitView, children: /* @__PURE__ */ u("canvas", { ref: s, className: T.Canvas }) })
  ] });
}
const li = "_LogicSim_k1eu4_1", hi = {
  LogicSim: li
};
function ui({ app: f }) {
  return /* @__PURE__ */ u("div", { className: hi.LogicSim, children: /* @__PURE__ */ u(ai, { app: f }) });
}
const pi = new _("Logic Sim", "logic-sim", ui).setIconUrl("https://os.prozilla.dev/assets/apps/icons/logic-sim.svg").setPinnedByDefault(!1).setCategory("Education").addSkinOverride(si, {
  iconUrl: L.assetUrl("/assets/skins/minimal/apps/icons/logic-sim.svg")
}).addSkinOverride(ei, {
  iconUrl: L.assetUrl("/assets/skins/pixel/apps/icons/logic-sim.png")
});
pi.setMetadata({ name: "@prozilla-os/logic-sim", version: "1.1.25", author: "Prozilla", website: "https://os.prozilla.dev/logic-sim" });
export {
  pi as logicSim
};
//# sourceMappingURL=main.js.map

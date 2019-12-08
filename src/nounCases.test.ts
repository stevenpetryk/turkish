import { makeAccusative, makeDative, makeAblative, makeGenitive } from "./nounCases"

test("makeAccusative()", () => {
  expect(makeAccusative("kedi")).toEqual("kediyi")
  expect(makeAccusative("köpek")).toEqual("köpeği")
  expect(makeAccusative("araba")).toEqual("arabayı")
  expect(makeAccusative("balık")).toEqual("balığı")
  expect(makeAccusative("menü")).toEqual("menüyü")
  expect(makeAccusative("gazete")).toEqual("gazeteyi")
  expect(makeAccusative("yumurta")).toEqual("yumurtayı")
})

test("makeGenitive()", () => {
  expect(makeGenitive("kedi")).toEqual("kedinin")
  expect(makeGenitive("havalimanı")).toEqual("havalimanının")
})

test("makeDative()", () => {
  expect(makeDative("park")).toEqual("parkta")
  expect(makeDative("banka")).toEqual("bankada")
  expect(makeDative("restoran")).toEqual("restoranda")
})

test("makeAblative()", () => {
  expect(makeAblative("park")).toEqual("parktan")
  expect(makeAblative("banka")).toEqual("bankadan")
  expect(makeAblative("restoran")).toEqual("restorandan")
})

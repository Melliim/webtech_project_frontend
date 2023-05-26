import examples from "./examples";


test("should know 1+1", () => {
   let expected = 2;
   let actual = examples.add(1,1)
    expect(actual).toBe(expected)
})
const { faker } = require("@faker-js/faker");
const jsonParser = require("./jsonParser");

// WORST IMPLEMENTATION, TASK IS NOT DONE
// Implement a parsing algorithm for JSON and test its behavior using TDD.

describe("jsonParser()", () => {
  it("Should return number if is number format", () => {
    const expectedResponse = faker.datatype.number();
    const json = JSON.stringify(expectedResponse);

    const response = jsonParser(json);

    expect(response).toBe(expectedResponse);
  });
  it("Should return boolean if is boolean format", () => {
    const expectedResponse = faker.datatype.boolean();
    const json = JSON.stringify(expectedResponse);

    const response = jsonParser(json);

    expect(response).toBe(expectedResponse);
  });
  it("Should return string if is string format", () => {
    const expectedResponse = faker.datatype.string();
    const json = JSON.stringify(expectedResponse);

    const response = jsonParser(json);

    expect(response).toBe(expectedResponse);
  });
  it("Should return array if is array json", () => {
       const expectedResponse = [
         faker.datatype.string(),
         faker.datatype.string(),
       ];
       const json = JSON.stringify(expectedResponse);

       const response = jsonParser(json);

       expect(response).toStrictEqual(expectedResponse);
  });
  it("Should return object if is object json", () => {
      const expectedResponse = { name: 'Name', lastname: "Lastname"};
      const json = JSON.stringify(expectedResponse);

      const response = jsonParser(json);

      expect(response).toStrictEqual(expectedResponse);
  });
  it("Should throw an error if it is unknown format", () => {
    const parma = '12r:afs,fas{{][s'
    const expectedError = "Unknown format";

    const errorFunc = () => jsonParser(parma);

    expect(errorFunc).toThrow(expectedError)
  });
});

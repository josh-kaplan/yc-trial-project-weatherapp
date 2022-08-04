export const safeParseJson = (dataString: string) => {
  if (!(typeof dataString === 'string')) return {};

  let jsonData = {};
  try {
    jsonData = JSON.parse(dataString)
  } catch (e) {
    jsonData = {}
    // tslint:disable-next-line:no-console
    console.log("Error parsing json data: ", e);
  }
  return jsonData;
}

export const safeParseRaw = (bufferData: Uint8Array[]) => {
  let jsonData = {} as any;
  try {
    const dataString = Buffer.concat(bufferData).toString('ascii');
    jsonData = safeParseJson(dataString);
  } catch (e) {
    jsonData = {};
  }
  return jsonData;
}

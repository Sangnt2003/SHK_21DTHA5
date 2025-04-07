export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


export function errorResponse(message, code, data = null) {
  return new Response(
    JSON.stringify({
      message,
      status: false,
      code,
      data,
    }),
    {
      status: code,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

export function successResponse(message, data, code = 200) {
  return new Response(
    JSON.stringify({
      message,
      status: true,
      code,
      data,
    }),
    {
      status: code,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

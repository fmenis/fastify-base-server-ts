export function buildRouteFullDescription(params: {
  api: string;
  description: string;
  errors?: [
    { code: string; description: string; apis: string; statusCode: number },
  ];
  permission?: string;
}): string {
  const { description, errors = [], api, permission } = params;

  let fullDescription = `${description} \n\n `;
  const apiErrors = errors.filter(item => item.apis.includes(api));

  if (apiErrors.length > 0) {
    const formattedErrors = apiErrors
      .map(
        item => `- ${item.statusCode} - ${item.code}: ${item.description} \n\n`,
      )
      .sort();

    fullDescription += ` **Custom errors**: \n\n ${formattedErrors.join(" ")}`;
  } else {
    fullDescription += ` **This api doesn't expose custom errors.** \n\n`;
  }

  if (permission) {
    fullDescription += `**Required permission**: *${permission}*.`;
  } else {
    fullDescription += `**No permission required to consume the api**.`;
  }

  return fullDescription;
}

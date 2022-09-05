import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
export const slugcheck = async (shortUrl) => {
  // TODO : API check to see if slug is already used
  const response = await axios.post(
    `${process.env.SHORTENURL_SERVER}/checkShortUrl`,
    {
      shortUrl,
    }
  );

  return response.data.success;
};

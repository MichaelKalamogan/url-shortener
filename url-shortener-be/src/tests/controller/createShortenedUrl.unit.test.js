import prisma from "../../../prisma/index.js";
import createController from "../../controllers/createShortenedUrl.js";

describe("Test if the create shortened URL controllers provide the correct output", () => {
  const seedTestData = [
    {
      originalUrl: "www.test1.com",
      shortUrl: "www.short1.com",
    },
    {
      originalUrl: "www.test2.com",
      shortUrl: "www.short2.com",
    },
    {
      originalUrl: "www.test3.com",
      shortUrl: "www.short3.com",
    },
  ];

  beforeAll(async () => {
    await prisma.url.createMany({ data: seedTestData });
  });

  afterAll(async () => {
    await prisma.url.deleteMany({});
  });

  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  test("check if can create with valid input", async () => {
    const mockReq = {
      body: { originalUrl: "www.mocktest.com", shortUrl: "www.mockshort1.com" },
    };

    const res = mockResponse();
    await createController.create(mockReq, res);

    const data = await prisma.url.findUniqueOrThrow({
      where: { shortUrl: "www.mockshort1.com" },
    });
    expect(data).toBeDefined();
    expect(res.status).toHaveBeenCalledWith(201);
  });

  test("check if does not create duplicate if short Url already exists", async () => {
    const mockReq = {
      body: {
        originalUrl: "www.mocktest.com",
        shortUrl: "www.mockshort1.com",
      },
    };

    const res = mockResponse();
    await createController.create(mockReq, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("checks and returns success: false of short Url already exists", async () => {
    const mockReq = {
      body: {
        shortUrl: "www.mockshort1.com",
      },
    };
    const res = mockResponse();
    await createController.check(mockReq, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: false });
  });

  test("checks and returns success: true of short Url does not exists", async () => {
    const mockReq = {
      body: {
        shortUrl: "www.mockshort2.com",
      },
    };

    const res = mockResponse();
    await createController.check(mockReq, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true });
  });
});

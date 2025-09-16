import { NextApiRequest, NextApiResponse } from 'next';

const BACKEND_URL = 'https://yummy-cymbre-orangecorp-43ef562b.koyeb.app';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path } = req.query;

  // Construct the full path
  const pathArray = Array.isArray(path) ? path : [path];
  const fullPath = pathArray.join('/');

  // Build query string from original request
  const url = new URL(req.url!, `http://${req.headers.host}`);
  const queryString = url.search;

  const targetUrl = `${BACKEND_URL}/api/v1/${fullPath}${queryString}`;

  try {
    console.log(`Proxying request: ${req.method} ${targetUrl}`);
    console.log('Request headers:', JSON.stringify(req.headers, null, 2));
    console.log('Request body:', req.body);

    // Prepare headers
    const headers: Record<string, string> = {};

    // Forward authorization header
    if (req.headers.authorization) {
      headers.Authorization = req.headers.authorization;
    }

    // Handle content type
    if (req.headers['content-type']) {
      headers['Content-Type'] = req.headers['content-type'];
    } else if (req.method !== 'GET' && req.method !== 'HEAD') {
      headers['Content-Type'] = 'application/json';
    }

    // Prepare request body
    let body;
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    // Forward the request to the backend
    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      ...(body && { body }),
    });

    // Get response data
    const contentType = response.headers.get('content-type');
    let data;

    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    // Forward response headers
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() !== 'content-encoding') {
        res.setHeader(key, value);
      }
    });

    // Forward the status and response
    res.status(response.status);

    if (contentType?.includes('application/json')) {
      res.json(data);
    } else {
      res.send(data);
    }
  } catch (error) {
    console.error('Proxy error:', error);
    console.error('Target URL was:', targetUrl);
    console.error('Original headers:', req.headers);
    res.status(500).json({
      error: 'Proxy request failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      targetUrl: targetUrl
    });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}
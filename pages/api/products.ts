import type { NextApiRequest, NextApiResponse } from 'next'

const products = [{
  id: '123-abc',
  name: 'flooring',
  brand: 'chene',
}, {
  id: '456-efg',
  name: 'tree farm',
  brand: 'sapin',
}, {
  id: '456-efg',
  name: 'hiking',
  brand: 'sapin',
}, {
  id: '789-hjk',
  name: 'sugar',
  brand: 'palmier',
}];

/**
 * @docs https://nextjs.org/docs/api-routes/introduction
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { brand } = req.cookies;
  const { productid } = req.query;

  
  if (productid) {
    return res.json({
      product: products.find(product => product.id === productid) || {}
    })
  }
  const brandList =  products.filter((product) => product.brand === brand)
  res.json({
    products: brandList
  })
}

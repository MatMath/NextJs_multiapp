import type { NextApiRequest } from 'next'
import { Layout, Link, Page, Text } from '@vercel/examples-ui'
import { useBrand } from '@hooks/useBrand';
import { Products } from '../../../lib/types';

type Props = {
    products: Products[];
};

export default function Product({ products }: Props) {
    const brand = useBrand();

    return (
        <Page>
            {products.map(product => <DisplayProduct key={product.id} product={product} />)}
        </Page>
    )
}

interface DisplayProductProps {
    product: Products;
}
const DisplayProduct = ({ product }: DisplayProductProps): JSX.Element => {
    // Need to add cart intergration
    return <div>
        <Link href={product.id}>Name: {product.id}</Link>
        <img src='https://placekitten.com/200/300'/>
        
    </div>
}

Product.Layout = Layout

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
    let products = [];
    const { brand } = req.cookies;

    try {
        const host = `http://${req.headers.host}` || '';
        console.log('host', host)
        const res = await fetch(`${host}/api/products`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                cookie: `brand=${brand}`,
            }
        });
        const data = await res.json()
        products = data.products;
    } catch (e: any) {
        if (e.message === 'cancelled') {
            // Cancelled by browser
            console.log('Request Cancelled by the Browser', e)
        } else {
            console.error('Network Error, CORS or timeout.', e)
        }
        products = [e.status];
    }


    return {
        props: {
            products,
        }
    }
}

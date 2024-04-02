import React from "react";
import { PageProps, graphql } from "gatsby";
import Img from "gatsby-image"; // React 组件，优化图像显示，基于gatsby-transformer-sharp插件转化后的数据。

function ProductionPage({ data }: PageProps<Queries.ProductionPageQuery>) {
  return (
    <div>
      {data?.allProductsJson.nodes.map((node, index) => (
        <div key={index}>
          <p>{node.title}</p>
          <p>{node.address}</p>
          <p>{node.price}</p>
          <div style={{ width: 600 }}>
            {/* fluid 接收响应式图片 图片的宽以父元素为准 */}
            {/* <Img fluid={node?.url?.childImageSharp?.fluid} /> */}
            {/* fixed 接收固定大小图片 图片的宽高固定 */}
            <Img fixed={node?.url?.childImageSharp?.fixed!} />
          </div>
        </div>
      ))}
    </div>
  );
}

// // 响应式图片
// export const query = graphql`
//   query ProductionPage {
//     allProductsJson {
//       nodes {
//         title
//         url {
//           childImageSharp {
//             fluid {
//               src
//               srcSet
//               sizes
//               aspectRatio
//             }
//           }
//         }
//         price
//         address
//       }
//     }
//   }
// `;

// 固定大小图片
export const query = graphql`
  query ProductionPage {
    allProductsJson {
      nodes {
        title
        url {
          childImageSharp {
            fixed(width: 200, height: 200) {
              src
              srcSet
              height
              width
            }
          }
        }
        price
        address
      }
    }
  }
`;

export default ProductionPage;

export const dynamicParams = false;
async function BlogSlug({ params }: { params: { slug: string } }) {
  const { data } = await getProps({ params });
  console.log(data);

  return (
    <div>
      <p>this is blog slug</p>
      <div>
        <span>{data.id}</span>
        <span>{data.title}</span>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return [{ slug: "1" }, { slug: "2" }];
}

export async function getProps({ params }: { params: { slug: string } }) {
  const id = params.slug;
  let data;
  switch (id) {
    case "1":
      data = { id: "1", title: "Hello" };
      break;
    case "2":
      data = { id: "2", title: "world" };
      break;
    case "3":
      data = { id: "3", title: "hello world" };
      break;
    default:
      data = {};
  }
  return {
    data,
  };
}

export default BlogSlug;

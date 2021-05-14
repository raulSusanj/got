export const renderAttributeList = (items: Array<string>) => {
  if (items.length && items[0]) {
    return (
      <ul>
        {items.map((item: string) => (
          <li>{item}</li>
        ))}
      </ul>
    );
  } else {
    return <span>Unknown</span>;
  }
};
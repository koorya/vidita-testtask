const getDate = () =>
  new Date(Date.now() - Math.round(Math.random() * 1e10))
    .toISOString()
    .match(/(.*)T/)[1];
let wordList = `Lorem ipsum dolor sit amet, consectetur adipiscing 
    elit. Curabitur posuere, enim et ornare bibendum, 
    nulla erat congue risus, non lobortis enim tortor in
    massa. Nulla tincidunt, nisl in pulvinar pretium, nisl lacus
    sagittis elit, non scelerisque ex velit vitae sem. Duis
    accumsan, eros quis maximus aliquam, risus velit convallis
    dolor, id tincidunt ex ante a velit. Maecenas eu nunc ornare,
    euismod dolor blandit, fermentum nisl. Donec a consectetur sem. 
    Fusce ac ligula iaculis, interdum nibh ut, vehicula dolor. Donec 
    faucibus orci ac rhoncus commodo. Fusce in lectus at velit imperdiet 
    iaculis quis id odio. Sed vitae dignissim urna, et mattis nulla. Praesent 
    odio metus, placerat vel libero eget, elementum sodales massa. Integer vitae
    ipsum aliquet, semper ligula eget, mollis quam. Nullam eu quam sit amet 
    erat luctus feugiat quis in orci. Quisque efficitur pellentesque ex id 
    tempor. Morbi vehicula lobortis urna eu ultricies.
    `.match(/(\w{4,})/g);

const generateDoc = (cnt, offset) => {
  let doc = [];
  for (let i = 0; i < cnt; i++)
    doc.push({
      id: `${i + offset}`,
      status: Math.random() > 0.7 ? "archive" : "active",
      sum: Math.round(Math.random() * 1e3),
      qty: Math.round(Math.random() * 1e1),
      volume: Math.round(Math.random() * 1e2),
      name: wordList[Math.round(Math.random() * (wordList.length - 1))],
      delivery_date: getDate(),
      currency: ["Dol", "Rub", "Eur"][Math.round(Math.random() * 2)],
    });
  return doc;
};
module.exports = () => ({
  documents1: generateDoc(15, 0),
  documents2: generateDoc(10, 200),
});

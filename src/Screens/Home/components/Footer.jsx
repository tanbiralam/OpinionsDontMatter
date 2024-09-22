const Footer = () => {
  return (
    <div className="text-base p-6 mt-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-white">What is Rantle?</h1>
        <p className="mb-2 text-white/70">
          Rantle is the best place to share your super important opinions
          without signing up. 😏 Because really, who wouldn&apos;t want to hear
          what you think? So go ahead, talk about whatever&apos;s on your
          mind—after all, it&apos;s not like anyone&apos;s been waiting to hear
          it! 🤷‍♂️💬
        </p>
        <p className="mb-4 text-white/70">
          If you find any bugs or have feedback, reach out to me (Tanbir){" "}
          <a
            href="https://x.com/iamtanbirr"
            className="underline"
            target="_blank"
          >
            here.
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;

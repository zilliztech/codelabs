import Layout from "../../components/layout";
import data from "../../codelab.json";
import { useMemo, useState } from "react";
import TabList from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TutorialCard from "../../components/card";
import { useTranslation } from "react-i18next";
import "./index.less";
import ToolBar from "../../components/toolBar";

export default function HomePage() {
  const { pathname } = window.location;
  const { t } = useTranslation();

  const [keyWord, setKeyWord] = useState("");
  const [categoryVal, setCategoryVal] = useState("all");
  const [sortWay, setSortWay] = useState("a-z");

  const handleChange = (e, value) => {
    setSortWay(value);
  };

  const categoryOptions = useMemo(() => {
    const options = [];
    data.forEach(({ category }) => {
      category.forEach(v => {
        if (options.includes(v)) return;
        options.push(v);
      });
    });

    return [
      {
        value: "all",
        label: "All",
        id: 0,
      },
      ...options.map((v, i) => ({
        label: v,
        value: v,
        id: i,
      })),
    ];
  }, [data]);

  const handleSearchChange = e => {
    setKeyWord(e.target.value);
  };

  const handleSelectorChange = e => {
    setCategoryVal(e.target.value);
  };

  const formatData = useMemo(() => {
    let tempData = data.slice();
    if (keyWord) {
      tempData = tempData.filter(({ title }) => title.includes(keyWord));
    }

    if (categoryVal !== "all") {
      tempData = tempData.filter(({ category }) =>
        category.includes(categoryVal)
      );
    }
    switch (sortWay) {
      case "a-z":
        return tempData.sort(
          (x, y) => x.title.charCodeAt(0) - y.title.charCodeAt(0)
        );
      case "recent":
        return tempData.sort(
          (x, y) =>
            new Date(x.updated).getTime() - new Date(y.updated).getTime()
        );
      case "duration":
        return tempData.sort((x, y) => x.duration - y.duration);
    }
  }, [sortWay, pathname, keyWord, categoryVal]);

  return (
    <Layout>
      <section className="home-container">
        <Box className="welcome">
          <Box className="inner">
            <Typography component="h2">{t("home.welcome.title")}</Typography>
            <Box>
              <Typography component="p">
                {t("home.welcome.content.lineOne")}
              </Typography>
              <Typography component="p">
                {t("home.welcome.content.lineThree")}{" "}
                <Link
                  href="https://github.com/milvus-io/milvus-tutorials"
                  target="_blank"
                >
                  {t("home.welcome.content.repo")}
                </Link>
                .
              </Typography>
              <Typography component="p">
                {t("home.welcome.content.lineFour")}{" "}
                <Link
                  href="https://github.com/milvus-io/bootcamp"
                  target="_blank"
                >
                  {t("home.welcome.content.bootcamp")}
                </Link>
                .
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <Box className="inner">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <TabList
                value={sortWay}
                onChange={handleChange}
                className="tab-bar"
              >
                <Tab label="A-Z" value="a-z" />
                <Tab label={t("home.tab.recent")} value="recent" />
                <Tab label={t("home.tab.duration")} value="duration" />
              </TabList>

              <ToolBar
                keyWord={keyWord}
                handleKeyWordChange={handleSearchChange}
                categoryVal={categoryVal}
                handleSelectorChange={handleSelectorChange}
                options={categoryOptions}
              />
            </Stack>

            <Box className="card-layout">
              {formatData.map(v => (
                <TutorialCard {...v} key={v.id} />
              ))}
            </Box>
          </Box>
        </Box>
      </section>
    </Layout>
  );
}

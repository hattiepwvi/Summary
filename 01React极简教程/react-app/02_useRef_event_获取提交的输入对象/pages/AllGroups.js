import GroupList from "../components/groups/GroupList";

const DUMMY_DATA = [
  {
    id: "m1",
    title: "Uniswap v4学习小组第一次活动",
    image: "https://www.academy/en/img/logo.png",
    goal: "2小时一起学习了v4的PoolManager合约",
    description:
      "v4使用了新的单例模式,所有池子都由PoolManager一个合约管理,所以这个合约非常重要。",
  },
  {
    id: "m2",
    title: "Uniswap v4学习小组第二次活动",
    image: "https://www.academy/en/img/logo.png",
    goal: "2小时一起学习了v4的PoolManager合约",
    description:
      "v4使用了新的单例模式,所有池子都由PoolManager一个合约管理,所以这个合约非常重要。",
  },
];

const AllGroupsPage = () => {
  return (
    <section>
      <h1>全部小组</h1>
      <GroupList groups={DUMMY_DATA} />
    </section>
  );
};

export default AllGroupsPage;

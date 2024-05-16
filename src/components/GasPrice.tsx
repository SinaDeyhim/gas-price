import React, { Suspense } from "react";
import {
  Card,
  Container,
  Text,
  Heading,
  Flex,
  Skeleton,
} from "@radix-ui/themes";
import useFetchSuspense from "../hooks/useSuspenseFetch";
import ErrorBoundary from "./ErrorBoundary";
import useSuspenseRefetch from "../hooks/useSuspenseRefetch";

type GasPricesResult = {
  FastGasPrice: string;
  SafeGasPrice: string;
  ProposeGasPrice: string;
};

type GasPricesResponse = {
  status: string;
  message: string;
  result: GasPricesResult;
};

type GasPriceItemProps = {
  title: GasTier;
  value: string;
};

const GAS_PRICE_URL = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey${process.env.REACT_APP_ETHERSCAN_API_KEY}`;

type GasTier = "Fast" | "Average" | "Slow";

const GAS_COLOR: Record<GasTier, string> = {
  Fast: "red-500",
  Average: "blue-500",
  Slow: "green-500",
};

const GasPricesContent: React.FC = () => {
  const gasPrices = useSuspenseRefetch(GAS_PRICE_URL) as GasPricesResponse;

  return (
    <Container className="mx-auto p-4 max-w-screen-md mt-6">
      <Heading className="font-semibold text-white">Gas Price Tracker</Heading>
      <Flex
        justify="between"
        className="mt-6"
        direction={{
          initial: "column",
          sm: "row",
        }}
      >
        <GasPriceItem title="Fast" value={gasPrices.result.FastGasPrice} />
        <GasPriceItem title="Average" value={gasPrices.result.SafeGasPrice} />
        <GasPriceItem title="Slow" value={gasPrices.result.ProposeGasPrice} />
      </Flex>
    </Container>
  );
};

const GasPriceItem: React.FC<GasPriceItemProps> = ({ title, value }) => {
  return (
    <Card className="bg-gray-200 p-4 mt-4 rounded-lg shadow-md min-w-[180px]">
      <Text className="font-bold pr-4">{title}:</Text>
      <Text
        className={`${
          GAS_COLOR[title] === "red-500"
            ? "text-red-500"
            : GAS_COLOR[title] === "blue-500"
            ? "text-blue-500"
            : "text-green-500"
        } font-semibold`}
      >
        {value} gwei
      </Text>
    </Card>
  );
};

const GasPricesContentLoading: React.FC = () => {
  return (
    <Container className="mx-auto p-4 max-w-screen-md mt-6 ">
      <Heading className="font-semibold text-white">Gas Price Tracker</Heading>
      <Flex
        justify="between"
        className="mt-10"
        direction={{
          initial: "column",
          sm: "row",
        }}
      >
        <Card className="bg-gray-200  p-4 rounded-lg shadow-md min-w-[180px]">
          <Skeleton width="100%" height="24px" />
        </Card>
        <Card className="bg-gray-200  p-4 rounded-lg shadow-md min-w-[180px]">
          <Skeleton width="100%" height="24px" />
        </Card>
        <Card className="bg-gray-200 p-4 rounded-lg shadow-md min-w-[180px]">
          <Skeleton width="100%" height="24px" />
        </Card>
      </Flex>
    </Container>
  );
};

const GasPricesContentError: React.FC = () => {
  return (
    <Container className="mx-auto p-4 max-w-screen-md mt-6">
      <Heading className="font-semibold text-white">Gas Price Tracker</Heading>
      <Card className="bg-gray-200 p-4 rounded-lg shadow-md min-w-[180px] mt-6">
        <Text className="font-bold pr-4 text-red-400">
          Gas prices could not be fetched. Please try again
        </Text>
      </Card>
    </Container>
  );
};

function GasPrices() {
  return (
    <ErrorBoundary fallback={<GasPricesContentError />}>
      <Suspense fallback={<GasPricesContentLoading />}>
        <GasPricesContent />
      </Suspense>
    </ErrorBoundary>
  );
}

export default GasPrices;

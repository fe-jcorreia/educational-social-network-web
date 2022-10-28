import { Button, Icon, Link, VStack } from "@chakra-ui/react";
import {
  FcCollaboration,
  FcConferenceCall,
  FcFilingCabinet,
  FcShop,
} from "react-icons/fc";
import { AppStrings } from "@src/strings";

interface HomeSideMenuProps {
  username?: string;
}

const strings = AppStrings.Home.sideMenu;

export const HomeSideMenu = (props: HomeSideMenuProps) => {
  return (
    <VStack alignItems="start">
      <Link href={`/edu/${props?.username}`}>
        <Button
          leftIcon={<Icon as={FcFilingCabinet} />}
          size="lg"
          variant="ghost"
          colorScheme="teal"
          w="100%"
          justifyContent="flex-start"
        >
          {strings.repositories}
        </Button>
      </Link>

      <Link href="/friends">
        <Button
          leftIcon={<Icon as={FcCollaboration} />}
          size="lg"
          variant="ghost"
          colorScheme="teal"
          w="100%"
          justifyContent="flex-start"
        >
          {strings.friends}
        </Button>
      </Link>

      <Link href="/groups">
        <Button
          leftIcon={<Icon as={FcConferenceCall} />}
          size="lg"
          variant="ghost"
          colorScheme="teal"
          w="100%"
          justifyContent="flex-start"
        >
          {strings.groups}
        </Button>
      </Link>

      <Link href="/marketplace">
        <Button
          leftIcon={<Icon as={FcShop} />}
          size="lg"
          variant="ghost"
          colorScheme="teal"
          w="100%"
          justifyContent="flex-start"
        >
          {strings.marketplace}
        </Button>
      </Link>
    </VStack>
  );
};

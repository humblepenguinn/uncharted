import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";

interface Props {
  isOpen: boolean;
  setIsPopOverOpen: any;
  isCorrect: boolean;
  setIsInvalidInput: any;
}

export default function PopOver({
  isOpen,
  setIsPopOverOpen,
  isCorrect,
  setIsInvalidInput,
}: Props) {
  return isCorrect ? (
    <Popover
      isOpen={isOpen}
      placement="bottom"
      color="success"
      onOpenChange={(open) => {
        setIsPopOverOpen(open);
        setIsInvalidInput(false);
      }}
    >
      <PopoverTrigger>
        <div></div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">Correct!</div>
          <div className="text-tiny">Here is the next riddle</div>
        </div>
      </PopoverContent>
    </Popover>
  ) : (
    <Popover
      isOpen={isOpen}
      placement="bottom"
      color="danger"
      onOpenChange={(open) => {
        setIsPopOverOpen(open);
        setIsInvalidInput(false);
      }}
    >
      <PopoverTrigger>
        <div></div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">Wrong Answer</div>
          <div className="text-tiny">Keep trying!</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

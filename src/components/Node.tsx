import React, { useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import colors from "../constants/colors";
import Status from "./Status";
import { Block, Node as NodeType } from "../types/Node";
import { useDispatch } from "react-redux";
import { getNodeBlocks } from "../reducers/nodes";

type Props = {
  node: NodeType;
  expanded: boolean;
  toggleNodeExpanded: (node: NodeType) => void;
};

const AccordionRoot = styled(Accordion)({
  margin: "16px 0",
  boxShadow: "0px 3px 6px 1px rgba(0,0,0,0.15)",

  "&:before": {
    backgroundColor: "unset",
  },
});

const AccordionSummaryContainer = styled(AccordionSummary)({
  padding: "0 24px",
  "& .MuiAccordionSummary-content": {
    margin: "10px 0 !important", // Avoid change of sizing on expanded
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: colors.faded,
  },
});

const BoxSummaryContent = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  paddingRight: 20,
});

const BlockBoxId = styled(Box)({
  height: "16px",
  left: "8px",
  right: "7.72px",
  top: "8px",

  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "700",
  fontSize: "10px",
  lineHeight: "16px",
  /* identical to box height, or 160% */

  letterSpacing: "1.5px",
  textTransform: "uppercase",

  // /* Primary Color */

  color: "#304FFE",
});

const BlockBox = styled(Box)({
  background: "rgba(0, 0, 0, 0.12)",
  borderRadius: "2px",
  height: "48px",
  left: "0px",
  right: "-0.28px",
  top: "0px",
  margin: "5px",
  padding: "5px",
});

const BlockBoxContent = styled(Box)({
  height: "20px",
  left: "8px",
  right: "7.72px",
  top: "24px",

  /* 14 sp • Body 2 */

  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "14px",
  lineHeight: "20px",
  /* identical to box height, or 143% */

  letterSpacing: "0.25px",

  /* Dark Color */

  color: "#263238",
});

const TypographyHeading = styled(Typography)({
  fontSize: 17,
  display: "block",
  color: colors.text,
  lineHeight: 1.5,
});

const TypographySecondaryHeading = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: colors.faded,
  lineHeight: 2,
}));

const Node: React.FC<Props> = ({ node, expanded, toggleNodeExpanded }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNodeBlocks(node));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderBlock = (block: Block) => {
    return (
      <BlockBox key={block.id}>
        <BlockBoxId>{block.id}</BlockBoxId>
        <BlockBoxContent> {block.content}</BlockBoxContent>
      </BlockBox>
    );
  };

  return (
    <AccordionRoot
      elevation={3}
      expanded={expanded}
      onChange={() => toggleNodeExpanded(node)}
    >
      <AccordionSummaryContainer expandIcon={<ExpandMoreIcon />}>
        <BoxSummaryContent>
          <Box>
            <TypographyHeading variant="h5">
              {node.name || "Unknown"}
            </TypographyHeading>
            <TypographySecondaryHeading variant="subtitle1">
              {node.url}
            </TypographySecondaryHeading>
          </Box>
          <Status loading={node.loading} online={node.online} />
        </BoxSummaryContent>
      </AccordionSummaryContainer>
      <AccordionDetails>
        <Typography>
          {node.blocks?.map((block) => renderBlock(block))}
        </Typography>
      </AccordionDetails>
    </AccordionRoot>
  );
};

export default Node;

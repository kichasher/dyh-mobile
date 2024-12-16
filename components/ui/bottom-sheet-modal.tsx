import React, { forwardRef, useCallback, useMemo } from "react";
import { View } from "react-native";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

interface BottomSheetCompProps {
  children: React.ReactNode;
}

const BottomSheetComp = forwardRef<BottomSheetModal, BottomSheetCompProps>(
  ({ children }, ref) => {
    const snapPoints = useMemo(() => ["50%", "75%"], []);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={1}
          opacity={0.5}
        />
      ),
      []
    );

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ width: 40, backgroundColor: "#A0A0A0" }}
      >
        <BottomSheetView style={{ flex: 1 }}>
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

BottomSheetComp.displayName = "BottomSheetComp";

export default BottomSheetComp;

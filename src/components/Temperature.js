import React, { useEffect, useState } from "react";
import { View, Text, Image, useWindowDimensions } from "react-native";
import axios from "axios";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const Temperature = (props) => {
  const { width } = useWindowDimensions();
  const { longlat } = props;
  const [status, setStatus] = useState({
    icon: "",
    temp: "",
    desc: "",
    min: "",
    max: "",
  });

  const tempHost = `http://api.openweathermap.org/data/2.5`;
  useEffect(() => {
    getTemp(longlat);
  }, [longlat]);

  const getTemp = (longlat) => {
    axios({
      method: "GET",
      url: `${tempHost}/weather?lat=${longlat.latitude}&lon=${longlat.longitude}&appid=29da58c656cbd975ea0b8fa5fe8c80ec&units=metric&lang=id`,
    })
      .then(({ data }) => {
        setStatus({
          ...status,
          icon: data.weather[0].icon,
          temp: data.main.temp,
          desc: data.weather[0].main,
          min: data.main.temp_min,
          max: data.main.temp_max,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={{ position: "relative", height: width / 2.5 + 35 }}>
      <View style={{ zIndex: 0 }}>
        <View style={{ alignItems: "center", zIndex: 1 }}>
          <View
            style={{
              width: 70,
              height: 70,
              borderRadius: 50,
              backgroundColor: "#949CDF",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {status ? (
              <View>
                <Image
                  source={{ uri: `http:openweathermap.org/img/wn/${status.icon}.png` }}
                  style={{ width: 66, height: 66 }}
                />
              </View>
            ) : (
              <SkeletonPlaceholder>
                <View style={{}}>
                  <View style={{ width: 70, height: 70, borderRadius: 50 }} />
                </View>
              </SkeletonPlaceholder>
            )}
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            width,
            width: width - 40,
            height: width / 2.5,
            top: 35,
            backgroundColor: "#16948c",
            borderRadius: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 15,
              marginTop: 10,
              height: 50,
              alignItems: "center",
            }}
          >
            {status ? (
              <>
                <Text style={{ fontSize: 35, color: "white", fontWeight: "bold" }}>
                  {Math.round(status.temp)}&#8451;
                </Text>
                <Text style={{ fontWeight: "bold", color: "white" }}>{status.desc}</Text>
              </>
            ) : (
              <SkeletonPlaceholder>
                <View style={{ height: 35, width: 50 }} />
                <View style={{ height: 17, width: 100 }} />
              </SkeletonPlaceholder>
            )}
          </View>
          <View style={{ borderBottomWidth: 1, borderColor: "white" }} />
          {status ? (
            <>
              <View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
                <Text style={{ color: "white", marginRight: 10 }}>
                  min: {Math.round(status.min)} &#8451;
                </Text>
                <Text style={{ color: "white", marginRight: 10 }}>
                  max: {Math.round(status.max)} &#8451;
                </Text>
              </View>
              <Text
                style={{
                  marginTop: 20,
                  marginHorizontal: 15,
                  fontSize: 20,
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {longlat.latitude}, {longlat.longitude}
              </Text>
            </>
          ) : (
            <SkeletonPlaceholder>
              <View style={{ justifyContent: "flex-end", flexDirection: "row", marginTop: 3 }}>
                <View style={{ marginRight: 10, width: 150, height: 13 }} />
              </View>
            </SkeletonPlaceholder>
          )}
        </View>
      </View>
    </View>
  );
};

export default Temperature;

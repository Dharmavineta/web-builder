import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pricingCards } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home = async () => {
  const { userId } = auth();
  console.log(userId);
  return (
    <>
      <section className="h-full w-full pt-10 md:pt-36 lg:pt-72 relative flex items-center justify-center flex-col">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        <p className="text-center font-bold text-3xl">
          Run your agency in one place
        </p>
        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
          <h1 className="text-9xl font-bold text-center md:text-[300px]">
            Plura
          </h1>
        </div>
        <div className="flex justify-center items-center relative md:mt-[-70px]">
          <Image
            src={"/assets/preview.png"}
            alt="banner image"
            height={1200}
            width={1200}
            className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"
          />
          <div className="bottom-0 top-1/2 bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10"></div>
        </div>
      </section>
      <section className="flex justify-center flex-col gap-4 items-center md:mt-20 lg:mt-40 mt-[-60px]">
        <h2 className="text-4xl text-center">Choose what fits you right</h2>
        <p className="text-muted-foreground text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et voluptates
          animi adipisci corrupti nesciunt blanditiis odio iure similique
          molestiae ullam?
        </p>
        <div className="flex w-full justify-center gap-4 flex-wrap mt-6">
          {pricingCards.map((card) => (
            // wire up free products from stripe
            <Card
              key={card.title}
              className={cn(
                "w-[300px] flex flex-col justify-between",
                card.title === "Unlimited Saas" && " border-2 border-primary"
              )}
            >
              <CardHeader>
                <CardTitle
                  className={cn(
                    "",
                    card.title !== "Unlimited Saas" && "text-muted-foreground"
                  )}
                >
                  {card.title}
                </CardTitle>
                <CardDescription>{card.description}</CardDescription>
                <CardContent>
                  <span className="text-4xl font-bold">{card.price}</span>
                  <span className="text-muted-foreground">/m</span>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4">
                  <div>
                    {card.features.map((feature) => (
                      <div key={feature} className="flex gap-2 items-center">
                        <Check />
                        <p className="text-muted-foreground">{feature}</p>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/agency?plan=${card.priceId}`}
                    className={cn(
                      " w-full text-center bg-primary p-2 rounded-md",
                      card.title !== "Unlimited Saas" && "!bg-muted-foreground"
                    )}
                  >
                    Get started
                  </Link>
                </CardFooter>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
